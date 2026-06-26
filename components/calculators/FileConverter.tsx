'use client'

import { useState, useRef } from 'react'

type Mode = 'docx-pdf' | 'pdf-docx'
type Status = 'idle' | 'converting' | 'done' | 'error'

const labelCls =
  'block font-mono text-paper-dim text-xs tracking-wider uppercase mb-1.5'

export default function FileConverter() {
  const [mode, setMode] = useState<Mode>('docx-pdf')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const accept =
    mode === 'docx-pdf'
      ? '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
      (mode === 'docx-pdf' && name.endsWith('.docx')) ||
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
        await convertDocxToPdf(file)
        setMessage(
          'Documento aberto em nova aba — use Ctrl+P (ou Cmd+P) e escolha "Salvar como PDF".'
        )
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

  async function convertDocxToPdf(f: File) {
    const arrayBuffer = await f.arrayBuffer()
    // mammoth is dynamically imported for code-splitting
    const mammoth = await import('mammoth')
    const convertToHtml =
      mammoth.convertToHtml ?? (mammoth as unknown as { default: typeof mammoth }).default.convertToHtml
    const { value: html } = await convertToHtml({ arrayBuffer })

    const baseName = f.name.replace(/\.docx?$/i, '')
    const safeTitle = baseName.replace(/[<>&"]/g, (c) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] ?? c)
    )

    const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${safeTitle}</title>
  <style>
    @page { margin: 2.5cm; size: A4; }
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; color: #000; background: #fff; }
    h1 { font-size: 18pt; } h2 { font-size: 16pt; } h3 { font-size: 14pt; }
    h1, h2, h3, h4, h5, h6 { margin: 0.8em 0 0.3em; line-height: 1.3; }
    p { margin: 0 0 0.5em; }
    table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
    td, th { border: 1px solid #aaa; padding: 4px 8px; }
    @media screen { body { max-width: 800px; margin: 2rem auto; padding: 0 2rem; background: #f0f0f0; } article { background: #fff; padding: 2.5rem 3rem; box-shadow: 0 2px 12px rgba(0,0,0,.12); } }
  </style>
</head>
<body><article>${html}</article></body>
</html>`

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    // keep URL alive long enough for the tab to load before revoking
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }

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
          'O arquivo pode ser um documento digitalizado (imagem sem camada de texto).'
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
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${baseName}.docx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
        aria-label={`Selecionar arquivo ${mode === 'docx-pdf' ? '.docx' : '.pdf'}`}
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
              {mode === 'docx-pdf' ? 'Aceita .docx (Word)' : 'Aceita .pdf'}
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
          ? 'Converter Word → PDF'
          : 'Converter PDF → Word'}
      </button>

      {/* Status / result message */}
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
          {status === 'done' && mode === 'docx-pdf' && (
            <p className="font-mono text-paper-muted text-xs mt-2">
              Windows: Ctrl+P → impressora &quot;Salvar como PDF&quot; · Mac: Cmd+P → botão PDF
            </p>
          )}
        </div>
      )}

      {/* PDF→DOCX quality note (shown before upload) */}
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
