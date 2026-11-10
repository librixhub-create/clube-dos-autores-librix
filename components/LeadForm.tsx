'use client'

import { useState } from 'react'

const WA_BASE = 'https://wa.me/5532998491620'

const SERVICES = [
  'Plano Completo',
  'Método Amazon Autor',
  'Publicação Start',
  'Publicação Completa',
  'Publicação + Academy',
  'Gestão de Tráfego — Meta Ads',
  'Site Essencial',
  'Site + Blog',
  'Site + Loja do Autor',
  'Site Profissional + Blog Exclusivo',
]

const UNSURE = 'Ainda não sei — quero orientação'

const field =
  'w-full bg-ink border border-gold/30 rounded-sm px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150'

/** Formulário curto de captação de leads (nome, WhatsApp, e-mail, serviço) no topo do site. */
export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [sent, setSent] = useState({ name: '', service: '' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang: 'pt' }),
      })
      if (!res.ok) throw new Error('bad')
      try {
        ;(window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.('track', 'Lead')
      } catch {
        /* pixel bloqueado: ignora */
      }
      setSent({ name: data.name, service: data.service === '?' ? UNSURE : data.service })
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    const text =
      `Olá! Sou ${sent.name}, deixei meus dados no site da LIBRIX ACADEMY.` +
      (sent.service ? ` Serviço de interesse: ${sent.service}.` : '')
    return (
      <div className="border border-gold/30 bg-ink-light rounded-sm p-6" role="status">
        <h2 className="font-serif text-xl text-paper mb-2">Recebemos seu contato!</h2>
        <p className="font-sans text-paper-dim text-sm mb-5">
          Já podemos falar agora pelo WhatsApp — é o jeito mais rápido.
        </p>
        <a
          href={`${WA_BASE}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#25D366] text-ink-deep font-sans font-bold text-base px-6 py-3 rounded text-center hover:opacity-90 transition-opacity"
        >
          Continuar no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-gold/30 bg-ink-light rounded-sm p-6 flex flex-col gap-3">
      <div>
        <h2 className="font-serif text-xl text-paper mb-1">Fale com a nossa equipe</h2>
        <p className="font-sans text-paper-dim text-sm">
          Deixe seus dados e respondemos no WhatsApp com preço e prazo. Sem compromisso.
        </p>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Seu nome" aria-label="Seu nome" className={field} />
      <input name="phone" type="tel" required maxLength={40} autoComplete="tel" placeholder="WhatsApp (com DDD ou indicativo)" aria-label="WhatsApp" className={field} />
      <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="Seu e-mail" aria-label="Seu e-mail" className={field} />
      <select name="service" defaultValue="" aria-label="Serviço de interesse" className={field}>
        <option value="">Qual serviço te interessa? (opcional)</option>
        <option value="?">{UNSURE}</option>
        {SERVICES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {status === 'error' && (
        <p role="alert" className="text-red-400 text-sm">
          Confira os dados e tente de novo.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-gold text-ink-deep font-sans font-bold text-base px-8 py-3 rounded hover:bg-gold-light transition-colors duration-200 disabled:opacity-60"
      >
        {status === 'sending' ? 'Enviando...' : 'Quero ser atendido'}
      </button>
    </form>
  )
}
