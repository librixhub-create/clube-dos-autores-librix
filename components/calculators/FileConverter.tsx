'use client'

import { useState, useRef } from 'react'

type Mode = 'docx-pdf' | 'pdf-docx'
type Status = 'idle' | 'converting' | 'done' | 'error'

const labelCls =
  'block font-mono text-paper-dim text-xs tracking-wider uppercase mb-1.5'

// A4 at 96 dpi ≈ 794px — used as render width for the PDF canvas
const A4_PX_WIDTH = 794

export default function FileConverter() {
  const [mode, setMode] = useState<Mode>('docx-pdf')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Accept .doc AND .docx for Word→PDF; .pdf for PDF→Word
  const accept =
    mode === 'docx-pdf'
      ? '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : '.pdf,application/pdf'

  function handleModeChange(newMode: Mode) {
    setMode(newMode)
    setFile(null)
    setStatus('idle')
    setMessage('')
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setStatus('idle')
    setMessage('')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    const name = dropped.name.toLowerCase()
    const ok =
      (mode === 'docx-pdf' && (name.endsWith('.docx') || name.endsWith('.doc'))) ||
      (mode === 'pdf-docx' && name.endsWith('.pdf'))
    if (ok) {
      setFile(dropped)
      setStatus('idle')
      setMessage('')
    }
  }

  async function handleConvert() {
    if (!file) return
    setStatus('converting')
    setMessage('')
    try {
      if (mode === 'docx-pdf') {
        await convertWordToPdf(file)
        setMessage('PDF gerado e baixado com sucesso.')
      } else {
        await convertPdfToDocx(file)
        setMessage('Arquivo Word (.docx) baixado com sucesso.')
      }
      setStatus('done')
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : 'Erro inesperado na conversão.'
      )
      setStatus('error')
    }
  }

  // ── Word (.doc / .docx) → PDF download ──────────────────────────────────
  async function convertWordToPdf(f: File) {
    const arrayBuffer = await f.arrayBuffer()

    // mammoth converts DOCX/DOC → HTML
    const mammoth = await import('mammoth')
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer })

    const baseName = f.name.replace(/\.docx?$/i, '')

    // Build a hidden A4-width container for html2canvas to render
    const container = document.createElement('div')
    Object.assign(container.style, {
      position: 'fixed',
      top: '0',
      left: '-9999px',
      width: `${A4_PX_WIDTH}px`,
      background: '#ffffff',
      color: '#000000',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '12pt',
      lineHeight: '1.6',
      padding: '72px 64px',
      boxSizing: 'border-box',
    })

    // Inject base styles so headings/tables render correctly
    const styleEl = document.createElement('style')
    styleEl.textContent = `
      h1{font-size:18pt;margin:.8em 0 .3em}
      h2{font-size:16pt;margin:.8em 0 .3em}
      h3{font-size:14pt;margin:.8em 0 .3em}
      h4,h5,h6{margin:.6em 0 .2em}
      p{margin:0 0 .5em}
      strong{font-weight:bold}
      em{font-style:italic}
      table{border-collapse:collapse;width:100%}
      td,th{border:1px solid #888;padding:4px 8px}
    `
    container.appendChild(styleEl)

    const contentEl = document.createElement('div')
    contentEl.innerHTML = html
    container.appendChild(contentEl)
    document.body.appendChild(container)

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      document.body.removeChild(container)

      const imgData = canvas.toDataURL('image/jpeg', 0.92)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = pdf.internal.pageSize.getWidth()   // 210 mm
      const pageH = pdf.internal.pageSize.getHeight()  // 297 mm

      // Scale canvas to fill the page width
      const scaledW = pageW
      const scaledH = (canvas.height / canvas.width) * pageW

      // Add image slice per page
      let posY = 0
      let remaining = scaledH

      pdf.addImage(imgData, 'JPEG', 0, posY, scaledW, scaledH)
      remaining -= pageH

      while (remaining > 0) {
        posY -= pageH
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, posY, scaledW, scaledH)
        remaining -= pageH
      }

      pdf.save(`${baseName}.pdf`)
    } catch (err) {
      if (document.body.contains(container)) document.body.removeChild(container)
      throw err
    }
  }

  // ── PDF → Word (.docx) download ──────────────────────────────────────────
  async function convertPdfToDocx(f: File) {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`

    const arrayBuffer = await f.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise

    const pageTexts: string[] = []
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p)
      const content = await page.getTextContent()
      const textItems = content.items.filter((item) => 'str' in item) as unknown as Array<{
        str: string
        hasEOL: boolean
      }>
      const text = textItems.map((item) => item.str + (item.hasEOL ? '\n' : '')).join('')
      if (text.trim()) pageTexts.push(text)
    }

    if (!pageTexts.length) {
      throw new Error(
        'Nenhum texto encontrado neste PDF. ' +
          'O arquivo pode ser digitalizado (imagem sem camada de texto).'
      )
    }

    const { Document, Packer, Paragraph, TextRun } = await import('docx')
    const paragraphs = pageTexts
      .join('\n')
      .split(/\n+/)
      .filter((line) => line.trim())
      .map(
        (line) =>
          new Paragraph({ children: [new TextRun({ text: line, size: 24 })] })
      )

    const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] })
    const blob = await Packer.toBlob(doc)
    const baseName = f.name.replace(/\.pdf$/i, '')
    triggerDownload(blob, `${baseName}.docx`)
  }

  function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Mode toggle */}
      <fieldset className="mb-8">
        <legend className={labelCls}>Tipo de conversão</legend>
        <div className="flex gap-2">
          {(
            [
              ['docx-pdf', 'Word → PDF'],
              ['pdf-docx', 'PDF → Word'],
            ] as [Mode, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => handleModeChange(m)}
              className={
                'flex-1 py-2.5 px-4 font-sans text-sm font-semibold rounded-sm border transition-colors duration-150 ' +
                (mode === m
                  ? 'bg-gold text-ink border-gold'
                  : 'bg-transparent text-paper-dim border-gold/25 hover:border-gold/50 hover:text-paper')
              }
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        aria-label={`Selecionar arquivo ${mode === 'docx-pdf' ? '.doc ou .docx' : '.pdf'}`}
        className={
          'border-2 border-dashed rounded-sm p-10 text-center cursor-pointer ' +
          'transition-colors duration-150 mb-6 ' +
          (file
            ? 'border-gold/60 bg-gold/5'
            : 'border-gold/25 hover:border-gold/50 bg-ink-light')
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
        />
        {file ? (
          <>
            <p className="font-mono text-gold text-sm mb-1 break-all">{file.name}</p>
            <p className="font-sans text-paper-muted text-xs">
              {(file.size / 1024).toFixed(1)} KB · clique para trocar
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-paper-dim text-sm mb-1">
              Arraste o arquivo ou clique para selecionar
            </p>
            <p className="font-sans text-paper-muted text-xs">
              {mode === 'docx-pdf' ? 'Aceita .doc e .docx (Word)' : 'Aceita .pdf'}
            </p>
          </>
        )}
      </div>

      {/* Convert button */}
      <button
        type="button"
        onClick={handleConvert}
        disabled={!file || status === 'converting'}
        className={
          'w-full font-sans font-bold text-base py-3 px-6 rounded transition-colors duration-150 ' +
          (!file || status === 'converting'
            ? 'bg-gold/30 text-ink/50 cursor-not-allowed'
            : 'bg-gold text-ink hover:bg-gold-light')
        }
      >
        {status === 'converting'
          ? 'Convertendo…'
          : mode === 'docx-pdf'
          ? 'Converter e baixar PDF'
          : 'Converter e baixar Word (.docx)'}
      </button>

      {/* Status message */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={
            'mt-5 border rounded-sm p-4 ' +
            (status === 'error'
              ? 'border-terra/40 bg-terra/10'
              : 'border-gold/30 bg-gold/5')
          }
        >
          <p
            className={
              'font-sans text-sm leading-relaxed ' +
              (status === 'error' ? 'text-terra' : 'text-paper-dim')
            }
          >
            {message}
          </p>
        </div>
      )}

      {/* Inline notes */}
      {mode === 'docx-pdf' && !file && (
        <p className="font-sans text-paper-muted text-xs mt-4 leading-relaxed">
          Gera um PDF pronto para download. Documentos com formatação simples convertem melhor.
        </p>
      )}
      {mode === 'pdf-docx' && !file && (
        <p className="font-sans text-paper-muted text-xs mt-4 leading-relaxed">
          Extrai o texto do PDF e gera um .docx editável.
          PDFs digitalizados (imagens sem camada de texto) não são compatíveis.
        </p>
      )}

      <p className="font-sans text-paper-muted text-xs mt-6 leading-relaxed">
        Seus arquivos são processados diretamente no navegador e nunca enviados a nenhum servidor.
      </p>
    </div>
  )
}
