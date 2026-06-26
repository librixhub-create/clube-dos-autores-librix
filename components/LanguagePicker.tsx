'use client'

import { useState } from 'react'

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'en', label: 'English' },
]

export default function LanguagePicker() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('PT')

  function translate(code: string, label: string) {
    setOpen(false)
    setActive(code.toUpperCase())
    if (code === 'pt') {
      window.location.href = window.location.origin + window.location.pathname
      return
    }
    const url = encodeURIComponent(window.location.href)
    window.location.href = `https://translate.google.com/translate?sl=pt&tl=${code}&u=${url}`
  }

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Selecionar idioma de tradução"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 font-mono text-paper-dim text-xs hover:text-gold transition-colors duration-200 border border-gold/20 hover:border-gold/40 rounded-sm px-2.5 py-1"
      >
        <span className="text-gold/60 text-[10px]" aria-hidden="true">◎</span>
        <span>{active}</span>
        <span
          className={
            'text-gold/40 text-[10px] transition-transform duration-150 ' +
            (open ? 'rotate-180' : '')
          }
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            aria-label="Idioma"
            className="absolute right-0 top-full mt-2 bg-ink-deep border border-gold/20 rounded-sm shadow-xl z-50 min-w-[160px] overflow-hidden"
          >
            <p className="font-mono text-paper-muted text-[10px] tracking-widest uppercase px-4 pt-3 pb-1">
              Traduzir para
            </p>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                role="option"
                type="button"
                aria-selected={active === lang.code.toUpperCase()}
                onClick={() => translate(lang.code, lang.label)}
                className={
                  'w-full text-left px-4 py-2.5 font-sans text-sm transition-colors duration-150 ' +
                  (active === lang.code.toUpperCase()
                    ? 'text-gold bg-gold/10'
                    : 'text-paper-dim hover:bg-gold/8 hover:text-paper')
                }
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
