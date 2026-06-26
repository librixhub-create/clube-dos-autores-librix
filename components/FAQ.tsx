'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. Sem fidelidade, sem prazo mínimo e sem multa. Basta avisar e cancelamos na hora — sem burocracia e sem perguntas.',
  },
  {
    q: 'O Clube serve para quem está começando do zero?',
    a: 'Sim! Os materiais foram pensados tanto para estreantes quanto para autores que já têm livros publicados. O checklist e os templates ajudam quem publica pela primeira vez a não pular nenhuma etapa importante.',
  },
  {
    q: 'Como funciona a revisão mensal?',
    a: 'Você envia sua capa ou descrição de livro pelo canal de comunicação do Clube e recebe um feedback especializado em até 5 dias úteis. É uma avaliação personalizada, feita por um especialista — não automática.',
  },
  {
    q: 'O que é a consultoria personalizada via call?',
    a: 'Uma sessão individual por videochamada para tirar dúvidas, revisar sua estratégia de publicação ou planejar seu próximo lançamento. O agendamento é feito diretamente com a equipe LIBRIX ACADEMY após a assinatura.',
  },
  {
    q: 'O Clube funciona para autores fora do Brasil?',
    a: 'Sim. O Plano Europa (€49/mês) foi criado especificamente para autores que publicam no mercado europeu. Todos os materiais são em português e cobrem tanto a Amazon Brasil quanto a europeia.',
  },
  {
    q: 'Como e quando recebo os materiais?',
    a: 'Tudo fica disponível imediatamente após a confirmação da assinatura. Você recebe as instruções de acesso pelo WhatsApp em até 24 horas após o pagamento.',
  },
  {
    q: 'Os templates são compatíveis com quais programas?',
    a: 'Os materiais são entregues em formatos universais compatíveis com Microsoft Word, Google Docs e Canva. Nenhum software pago é necessário.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  function toggle(idx: number) {
    setOpen((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-6 bg-ink-light"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            Dúvidas frequentes
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Perguntas & Respostas
          </h2>
        </header>

        <dl className="space-y-2">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = open === idx
            return (
              <div
                key={idx}
                className={
                  'border rounded-sm transition-colors duration-150 ' +
                  (isOpen ? 'border-gold/35 bg-ink' : 'border-gold/15 bg-ink hover:border-gold/25')
                }
              >
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-sans text-paper text-sm sm:text-base font-semibold leading-snug">
                      {item.q}
                    </span>
                    <span
                      className={
                        'font-mono text-gold flex-shrink-0 text-base transition-transform duration-200 ' +
                        (isOpen ? 'rotate-45' : '')
                      }
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  hidden={!isOpen}
                  className="px-5 pb-5"
                >
                  <p className="font-sans text-paper-dim text-sm leading-relaxed">
                    {item.a}
                  </p>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
