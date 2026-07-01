import SignupForm from './SignupForm'

const INCLUDES = [
  {
    label: 'Templates de capa, descrição e lançamento',
    note: 'Sempre atualizados com as melhores práticas KDP',
  },
  {
    label: '10 artes de social media por mês',
    note: 'Instagram, Facebook e LinkedIn — prontas para usar',
  },
  {
    label: 'Checklist completo de publicação KDP',
    note: 'Nunca mais esqueça uma etapa do processo',
  },
  {
    label: 'Guia Completo de Publicação na Amazon',
    note: 'Do zero ao livro publicado, passo a passo',
  },
  {
    label: 'Kit de Funil para Lançamento',
    note: 'Cronograma, escopo, estratégia e planejamento',
  },
  {
    label: 'Pacotes prontos de planejamento de lançamento',
    note: 'Kits exclusivos com tudo organizado para você',
  },
  {
    label: '1 revisão mensal de capa ou descrição',
    note: 'Feedback especializado em até 5 dias úteis',
  },
  {
    label: 'Consultoria personalizada via call mensal',
    note: 'Sessão individual por videochamada com a equipe',
  },
  {
    label: 'Site com blog profissional — 15% de desconto',
    note: 'Desconto exclusivo para membros da Academy',
  },
  {
    label: 'Cancelamento livre a qualquer momento',
    note: 'Sem fidelidade, sem prazo mínimo, sem multa',
  },
]

export default function Pricing() {
  return (
    <section
      id="planos"
      className="py-24 px-4 sm:px-6"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14 text-center">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            Investimento
          </p>
          <h2
            id="pricing-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Tudo incluído. Sem surpresas.
          </h2>
          <p className="font-sans text-paper-dim text-sm mt-3 max-w-sm mx-auto">
            Comece com uma reunião gratuita. Assine só se fizer sentido para você.
          </p>
        </header>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl shadow-glow-purple">

            {/* Outer stamp border */}
            <div className="border-2 border-gold p-1.5">
              <div className="border border-gold/35 bg-ink-deep relative">

                {/* Corner marks */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30" aria-hidden="true" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30" aria-hidden="true" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30" aria-hidden="true" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30" aria-hidden="true" />

                {/* Header — price */}
                <div className="px-8 pt-8 pb-6 text-center border-b border-gold/15">
                  <p className="font-mono text-gold/60 text-xs tracking-[0.2em] uppercase mb-4">
                    LIBRIX ACADEMY · Plano Mensal · 7 dias grátis
                  </p>
                  <div
                    className="flex items-start justify-center gap-1 mb-1"
                    aria-label="€49 por mês após o período de teste"
                  >
                    <span className="font-mono text-gold/70 text-sm mt-4" aria-hidden="true">€</span>
                    <span className="font-mono text-gold font-bold text-7xl sm:text-8xl leading-none" aria-hidden="true">
                      49
                    </span>
                    <span className="font-mono text-gold/50 text-sm self-end mb-2" aria-hidden="true">/mês</span>
                  </div>
                  <p className="font-sans text-paper-muted text-xs mt-1">
                    Prefere anual? <span className="text-paper">€ 469/ano</span> — equivale a 2+ meses grátis
                  </p>

                  {/* "Você leva tudo isso" — destaque abaixo do preço */}
                  <div className="mt-6 pt-5 border-t border-gold/10">
                    <p className="font-serif text-terra-light font-bold text-base mb-0.5">
                      Você leva tudo isso:
                    </p>
                    <p className="font-mono text-terra/50 text-[10px] tracking-widest uppercase mb-5">
                      incluído no seu plano mensal
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {INCLUDES.map((item) => (
                        <span
                          key={item.label}
                          className="inline-flex items-center gap-1.5 bg-terra/10 border border-terra/25 text-terra-light font-sans text-[11px] px-2.5 py-1 leading-snug"
                        >
                          <span className="text-terra font-bold text-xs" aria-hidden="true">✓</span>
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body — 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gold/15">

                  {/* Left — included items */}
                  <div className="px-6 py-7">
                    <p className="font-mono text-gold/60 text-[10px] tracking-widest uppercase mb-5">
                      O que está incluído
                    </p>
                    <ul className="space-y-4" role="list">
                      {INCLUDES.map((item) => (
                        <li key={item.label} className="flex items-start gap-3">
                          <span
                            className="font-mono text-gold text-xs flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <div>
                            <p className="font-sans text-paper text-sm font-medium leading-snug">
                              {item.label}
                            </p>
                            <p className="font-mono text-paper-muted text-xs mt-0.5 leading-snug">
                              {item.note}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right — includes reminder + guarantee + form */}
                  <div className="px-6 py-7 flex flex-col gap-5">

                    {/* "Você leva tudo isso" — compact terra pills near the form */}
                    <div className="border border-terra/20 bg-terra/5 px-4 py-4">
                      <p className="font-serif text-terra-light font-bold text-sm mb-3">
                        Você leva tudo isso:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {INCLUDES.map((item) => (
                          <span
                            key={item.label}
                            className="inline-flex items-center gap-1 bg-terra/15 border border-terra/25 text-terra-light font-sans text-[10px] px-2 py-0.5 leading-snug"
                          >
                            <span className="text-terra font-bold" aria-hidden="true">✓</span>
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="border border-gold/25 bg-gold/5 rounded-sm px-4 py-3 flex items-start gap-3">
                      <span className="font-mono text-gold flex-shrink-0 mt-0.5" aria-hidden="true">✦</span>
                      <div>
                        <p className="font-sans text-paper text-sm font-semibold mb-0.5">
                          Garantia de 7 dias
                        </p>
                        <p className="font-sans text-paper-dim text-xs leading-relaxed">
                          Se não gostar nos primeiros 7 dias, devolvemos seu dinheiro. Sem perguntas.
                        </p>
                      </div>
                    </div>

                    {/* Extra kit */}
                    <div className="border border-gold/25 bg-gold/5 rounded-sm px-4 py-3 flex items-start gap-3">
                      <span className="font-mono text-gold flex-shrink-0 mt-0.5" aria-hidden="true">◆</span>
                      <div>
                        <p className="font-mono text-gold/60 text-[10px] tracking-widest uppercase mb-1">
                          Exclusivo neste plano
                        </p>
                        <p className="font-sans text-paper text-sm font-medium leading-snug">
                          Pacotes prontos de planejamento para lançamento do seu livro na Europa
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="flex-1 flex flex-col justify-end">
                      <SignupForm />
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
