'use client'

import { useState } from 'react'
import Link from 'next/link'
import LanguagePicker from './LanguagePicker'

const WA_URL =
  'https://wa.me/5532998491620?text=Quero+entrar+na+LIBRIX+ACADEMY'

const LANG_CODES = [
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'en', label: 'English' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function translateMobile(code: string) {
    setOpen(false)
    const url = encodeURIComponent(window.location.href)
    window.location.href = `https://translate.google.com/translate?sl=pt&tl=${code}&u=${url}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-sm border-b border-gold/20">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-1.5"
          aria-label="LIBRIX ACADEMY — página inicial"
        >
          <span className="font-serif text-xl font-bold text-gold tracking-wider">
            LIBRIX
          </span>
          <span className="font-sans text-xs text-paper/50 font-normal tracking-widest uppercase">
            ACADEMY
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-5">
          <a
            href="https://www.librixhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-paper-dim text-sm hover:text-gold transition-colors duration-200"
          >
            librixhub.com
          </a>
          <Link
            href="/calculadoras"
            className="font-sans text-paper-dim text-sm hover:text-gold transition-colors duration-200"
          >
            Ferramentas
          </Link>
          <LanguagePicker />
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-terra text-paper font-sans text-sm font-semibold px-4 py-2 rounded hover:bg-terra-light transition-colors duration-200"
          >
            Entrar na Academy
          </a>
        </div>

        {/* Mobile: CTA pequeno + hambúrguer */}
        <div className="flex sm:hidden items-center gap-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-terra text-paper font-sans text-xs font-semibold px-3 py-2 rounded hover:bg-terra-light transition-colors duration-200"
          >
            Entrar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex flex-col justify-center gap-[5px] w-6 h-6"
          >
            <span
              className={
                'block h-px bg-paper transition-transform duration-200 origin-center ' +
                (open ? 'rotate-45 translate-y-[7px]' : '')
              }
            />
            <span
              className={
                'block h-px bg-paper transition-opacity duration-200 ' +
                (open ? 'opacity-0' : '')
              }
            />
            <span
              className={
                'block h-px bg-paper transition-transform duration-200 origin-center ' +
                (open ? '-rotate-45 -translate-y-[7px]' : '')
              }
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="sm:hidden bg-ink-deep border-t border-gold/15 px-4 py-4 flex flex-col gap-1"
        >
          <Link
            href="/calculadoras"
            onClick={() => setOpen(false)}
            className="font-sans text-paper-dim text-sm py-3 border-b border-gold/10 hover:text-paper transition-colors duration-200 flex items-center justify-between"
          >
            Ferramentas para Autores
            <span className="font-mono text-gold/40 text-xs">→</span>
          </Link>

          <a
            href="https://www.librixhub.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="font-sans text-paper-dim text-sm py-3 border-b border-gold/10 hover:text-paper transition-colors duration-200 flex items-center justify-between"
          >
            librixhub.com
            <span className="font-mono text-gold/40 text-xs">↗</span>
          </a>

          <a
            href="https://www.instagram.com/librixhub"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="font-sans text-paper-dim text-sm py-3 border-b border-gold/10 hover:text-paper transition-colors duration-200 flex items-center justify-between"
          >
            @librixhub
            <span className="font-mono text-gold/40 text-xs">↗</span>
          </a>

          {/* Traduzir */}
          <div className="py-3 border-b border-gold/10">
            <p className="font-mono text-paper-muted text-[10px] tracking-widest uppercase mb-2.5">
              Traduzir página
            </p>
            <div className="flex flex-wrap gap-2">
              {LANG_CODES.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => translateMobile(code)}
                  className="font-mono text-paper-dim text-xs border border-gold/20 rounded-sm px-2.5 py-1 hover:border-gold/50 hover:text-paper transition-colors duration-150"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 block w-full bg-terra text-paper font-sans font-semibold text-sm py-3 rounded text-center hover:bg-terra-light transition-colors duration-200"
          >
            Entrar na Academy
          </a>
        </div>
      )}
    </header>
  )
}
