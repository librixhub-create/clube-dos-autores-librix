'use client'

import { useState } from 'react'
import ResultStamp from './ResultStamp'
import {
  calculateSpine,
  type PaperType,
  type BookSize,
  BOOK_DIMENSIONS,
} from '@/lib/spine-calculator'

const DISCLAIMER =
  'Valores estimados com base nas regras da Amazon KDP em 2024–2025. ' +
  'Taxas podem mudar — confirme sempre no painel oficial do KDP antes de publicar.'

const PAPER_OPTIONS: { value: PaperType; label: string; detail: string }[] = [
  { value: 'white', label: 'Branco',           detail: '0.002252" / página' },
  { value: 'cream', label: 'Creme',            detail: '0.0025" / página' },
  { value: 'color', label: 'Colorido/Premium', detail: '0.002347" / página' },
]

const BOOK_SIZE_OPTIONS = Object.keys(BOOK_DIMENSIONS) as BookSize[]

const labelCls =
  'block font-mono text-paper-dim text-xs tracking-wider uppercase mb-1.5'
const inputCls =
  'w-full bg-ink border border-gold/25 text-paper font-mono text-sm px-3 py-2 rounded-sm ' +
  'focus:outline-none focus:border-gold/70 placeholder:text-paper-muted'
const selectCls =
  'w-full bg-ink border border-gold/25 text-paper font-sans text-sm px-3 py-2 pr-8 rounded-sm ' +
  'focus:outline-none focus:border-gold/70 appearance-none'

export default function SpineCalculator() {
  const [pages, setPages] = useState('')
  const [paperType, setPaperType] = useState<PaperType>('white')
  const [bookSize, setBookSize] = useState<BookSize>('6x9')

  const pagesNum = Math.max(0, parseInt(pages) || 0)
  const hasResult = pagesNum > 0

  const result = hasResult
    ? calculateSpine({ pages: pagesNum, paperType, bookSize })
    : null

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {/* Pages */}
        <div>
          <label htmlFor="sp-pages" className={labelCls}>
            Número de páginas do miolo
          </label>
          <input
            id="sp-pages"
            type="number"
            min="1"
            step="1"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="ex: 200"
            className={inputCls}
          />
        </div>

        {/* Book size */}
        <div>
          <label htmlFor="sp-size" className={labelCls}>
            Tamanho do livro (trim size)
          </label>
          <div className="relative">
            <select
              id="sp-size"
              value={bookSize}
              onChange={(e) => setBookSize(e.target.value as BookSize)}
              className={selectCls}
            >
              {BOOK_SIZE_OPTIONS.map((s) => {
                const [w, h] = BOOK_DIMENSIONS[s]
                return (
                  <option key={s} value={s}>
                    {s} pol. ({(w * 25.4).toFixed(0)} × {(h * 25.4).toFixed(0)} mm)
                  </option>
                )
              })}
            </select>
            <span
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-paper-muted text-xs"
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </div>

        {/* Paper type */}
        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>Tipo de papel</legend>
          <div className="flex flex-wrap gap-2" role="group">
            {PAPER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={paperType === opt.value}
                onClick={() => setPaperType(opt.value)}
                className={
                  'py-2 px-4 font-sans text-sm font-semibold rounded-sm border transition-colors duration-150 ' +
                  (paperType === opt.value
                    ? 'bg-gold text-ink border-gold'
                    : 'bg-transparent text-paper-dim border-gold/25 hover:border-gold/50 hover:text-paper')
                }
              >
                <span>{opt.label}</span>
                <span className="block font-mono text-xs opacity-70 mt-0.5">
                  {opt.detail}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Results */}
      {result && (
        <div>
          {result.warning && (
            <div
              role="alert"
              aria-live="polite"
              className="border border-terra/40 bg-terra/10 rounded-sm p-4 mb-6"
            >
              <p className="font-sans text-sm text-terra">{result.warning}</p>
            </div>
          )}

          {/* Spine stamp */}
          <div className="mb-5">
            <ResultStamp
              label="Largura da lombada"
              value={`${result.spineWidthInches.toFixed(4)}"`}
              subtitle={`${result.spineWidthMm.toFixed(2)} mm`}
            />
          </div>

          {/* Cover dimensions */}
          <div className="border border-gold/15 rounded-sm p-5 bg-ink-light mb-4">
            <p className="font-mono text-paper-muted text-xs tracking-wider uppercase mb-4">
              Dimensões da capa plana completa
              <span className="normal-case ml-1 text-paper-muted/70">(frente + lombada + verso + sangria)</span>
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between items-baseline gap-4 flex-wrap">
                <dt className="font-sans text-paper-dim">Largura total</dt>
                <dd className="font-mono text-paper">
                  {result.coverWidthInches.toFixed(4)}{'" '}·{' '}
                  {result.coverWidthMm.toFixed(1)} mm
                </dd>
              </div>
              <div className="flex justify-between items-baseline gap-4 flex-wrap">
                <dt className="font-sans text-paper-dim">Altura total</dt>
                <dd className="font-mono text-paper">
                  {result.coverHeightInches.toFixed(4)}{'" '}·{' '}
                  {result.coverHeightMm.toFixed(1)} mm
                </dd>
              </div>
              <div className="flex justify-between items-baseline gap-4 flex-wrap pt-2 border-t border-gold/15">
                <dt className="font-sans text-paper font-semibold">
                  Pixels @300 DPI{' '}
                  <span className="font-normal text-paper-dim">(Canva / Photoshop)</span>
                </dt>
                <dd className="font-mono text-gold font-bold">
                  {result.coverWidthPx} × {result.coverHeightPx} px
                </dd>
              </div>
            </dl>
          </div>

          {/* Canva tip */}
          <div className="border border-gold/20 rounded-sm p-4 bg-ink">
            <p className="font-mono text-gold/70 text-xs tracking-wider uppercase mb-1.5">
              Como usar no Canva
            </p>
            <p className="font-sans text-paper-dim text-sm leading-relaxed">
              Crie um design com tamanho personalizado de{' '}
              <strong className="text-paper">
                {result.coverWidthPx} × {result.coverHeightPx} px
              </strong>{' '}
              em 300 DPI. Inclui 3,175 mm (0.125") de sangria em cada borda.
              Exporte como PDF com marcas de corte ao final.
            </p>
          </div>
        </div>
      )}

      <p className="font-sans text-paper-muted text-xs mt-6 leading-relaxed">
        {DISCLAIMER}
      </p>
    </div>
  )
}
