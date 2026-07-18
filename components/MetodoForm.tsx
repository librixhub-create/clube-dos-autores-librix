'use client'

import { useState } from 'react'

const WA_BASE = 'https://wa.me/5532998491620'

export default function MetodoForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const canSubmit = name.trim().length >= 2

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    const emailPart = email ? ` (${email})` : ''
    const msg =
      `Olá! Quero adquirir o Método Amazon Autor por €10. Me chamo ${name.trim()}${emailPart}. Como faço o pagamento?`
    window.open(`${WA_BASE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome *"
        required
        minLength={2}
        className="w-full bg-ink border border-gold/30 rounded-sm px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
        aria-label="Seu nome"
        autoComplete="given-name"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail (opcional)"
        className="w-full bg-ink border border-gold/30 rounded-sm px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
        aria-label="Seu e-mail"
        autoComplete="email"
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-gold text-ink-deep font-sans font-bold text-base py-3 px-6 rounded text-center hover:bg-gold-light transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
      >
        Quero o Método Amazon Autor
      </button>

      <p className="font-sans text-paper-muted text-xs text-center leading-relaxed">
        Você fala com a gente no WhatsApp para confirmar o pagamento · Acesso imediato após a confirmação
      </p>
    </form>
  )
}
