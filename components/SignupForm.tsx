'use client'

import { useState } from 'react'

const WA_BASE = 'https://wa.me/5532998491620'

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
]

function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function formatDate(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const canSubmit = name.trim().length >= 2 && date && time

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    const emailPart = email ? ` (${email})` : ''
    const msg =
      `Olá! Me chamo ${name.trim()}${emailPart} e gostaria de agendar uma reunião de apresentação da LIBRIX ACADEMY para o dia ${formatDate(date)} às ${time}. Aguardo confirmação!`
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

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="font-mono text-paper-muted text-xs tracking-wide uppercase">
            Data *
          </label>
          <input
            type="date"
            value={date}
            min={minDate()}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full bg-ink border border-gold/30 rounded-sm px-3 py-2.5 font-sans text-paper text-sm focus:outline-none focus:border-gold/60 transition-colors duration-150 [color-scheme:dark]"
            aria-label="Data da reunião"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-paper-muted text-xs tracking-wide uppercase">
            Horário *
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full bg-ink border border-gold/30 rounded-sm px-3 py-2.5 font-sans text-paper text-sm focus:outline-none focus:border-gold/60 transition-colors duration-150 appearance-none"
            aria-label="Horário da reunião"
          >
            <option value="" disabled>Escolha</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-gold text-ink-deep font-sans font-bold text-base py-3 px-6 rounded text-center hover:bg-gold-light transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
      >
        Agendar reunião pelo WhatsApp
      </button>

      <p className="font-sans text-paper-muted text-xs text-center leading-relaxed">
        Reunião gratuita, sem compromisso · 7 dias grátis após assinar
      </p>
    </form>
  )
}
