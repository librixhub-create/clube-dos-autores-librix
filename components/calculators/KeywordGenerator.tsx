'use client'

import { useState } from 'react'
import { GENRE_LABELS, GENRE_KEYWORDS, type Genre } from '@/lib/keyword-data'

const KDP_MAX_CHARS = 50
const KDP_MAX_SELECTED = 7

export default function KeywordGenerator() {
  const [genre, setGenre] = useState<Genre>('romance')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)

  const keywords = GENRE_KEYWORDS[genre]

  function toggleKeyword(idx: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else if (next.size < KDP_MAX_SELECTED) {
        next.add(idx)
      }
      return next
    })
    setCopied(false)
  }

  function handleGenreChange(g: Genre) {
    setGenre(g)
    setSelected(new Set())
    setCopied(false)
  }

  async function copySelected() {
    const lines = Array.from(selected).map((i) => keywords[i])
    await navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const atLimit = selected.size >= KDP_MAX_SELECTED

  return (
    <div>
      {/* Genre selector */}
      <div className="mb-8">
        <label
          htmlFor="kw-genre"
          className="block font-mono text-paper-dim text-xs tracking-wider uppercase mb-1.5"
        >
          Gênero do livro
        </label>
        <div className="relative">
          <select
            id="kw-genre"
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value as Genre)}
            className="w-full bg-ink border border-gold/25 text-paper font-sans text-sm px-3 py-2 pr-8 rounded-sm focus:outline-none focus:border-gold/70 appearance-none"
          >
            {(Object.entries(GENRE_LABELS) as [Genre, string][]).map(([g, label]) => (
              <option key={g} value={g}>
                {label}
              </option>
            ))}
          </select>
          <span
            className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-paper-muted text-xs"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
      </div>

      {/* Counter + list */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-paper-dim text-xs tracking-wider uppercase">
            Clique para selecionar
          </p>
          <p
            className={
              'font-mono text-xs font-semibold ' +
              (atLimit ? 'text-gold' : 'text-paper-muted')
            }
          >
            {selected.size}/{KDP_MAX_SELECTED} selecionadas
          </p>
        </div>

        <ul className="space-y-2" role="list">
          {keywords.map((kw, idx) => {
            const isSelected = selected.has(idx)
            const isDisabled = !isSelected && atLimit
            const charCount = kw.length
            const tooLong = charCount > KDP_MAX_CHARS

            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => !isDisabled && toggleKeyword(idx)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={
                    'w-full text-left px-4 py-2.5 rounded-sm border text-sm transition-colors duration-150 flex items-center justify-between gap-3 ' +
                    (isSelected
                      ? 'border-gold/60 bg-gold/10 text-paper'
                      : isDisabled
                      ? 'border-gold/10 text-paper-muted cursor-not-allowed opacity-50'
                      : 'border-gold/20 text-paper-dim hover:border-gold/45 hover:text-paper cursor-pointer')
                  }
                >
                  <span className="font-sans leading-snug">{kw}</span>
                  <span
                    className={
                      'font-mono text-xs flex-shrink-0 ' +
                      (tooLong ? 'text-terra' : 'text-paper-muted')
                    }
                    aria-label={`${charCount} de ${KDP_MAX_CHARS} caracteres`}
                  >
                    {charCount}/{KDP_MAX_CHARS}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={copySelected}
        disabled={selected.size === 0}
        className={
          'w-full font-sans font-bold text-base py-3 px-6 rounded transition-colors duration-150 ' +
          (selected.size === 0
            ? 'bg-gold/30 text-ink/50 cursor-not-allowed'
            : copied
            ? 'bg-ink-mid border border-gold/50 text-gold'
            : 'bg-gold text-ink hover:bg-gold-light')
        }
      >
        {copied
          ? '✓ Copiado!'
          : selected.size > 0
          ? `Copiar ${selected.size} keyword${selected.size !== 1 ? 's' : ''}`
          : 'Selecione ao menos 1 keyword'}
      </button>

      {atLimit && (
        <p
          role="status"
          aria-live="polite"
          className="font-sans text-gold text-xs mt-3 text-center"
        >
          Limite do KDP atingido — máximo de {KDP_MAX_SELECTED} keywords por livro.
        </p>
      )}

      <div className="border border-gold/15 rounded-sm p-4 mt-6 bg-ink-light">
        <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-2">
          Dicas KDP
        </p>
        <ul className="space-y-1">
          {[
            'Use frases de 2–4 palavras, não termos isolados',
            'Não repita palavras que já estão no título ou subtítulo',
            'Pense no que o leitor digitaria para encontrar seu livro',
            'Cada campo aceita até 50 caracteres',
          ].map((tip) => (
            <li key={tip} className="font-sans text-paper-muted text-xs flex gap-2">
              <span className="text-gold/40 flex-shrink-0">·</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
