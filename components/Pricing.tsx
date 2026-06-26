import SignupForm from './SignupForm'

interface PlanCardProps {
  region: string
  badge: string
  sym: string
  whole: string
  annualLine: string
  extra?: string
}

function PlanCard({ region, badge, sym, whole, annualLine, extra }: PlanCardProps) {
  return (
    <div>
      <p className="font-mono text-paper-muted text-xs tracking-widest uppercase mb-3 text-center">
        {region}
      </p>

      {/* Guarantee callout */}
      <div className="border border-gold/25 bg-gold/5 rounded-sm px-4 py-3 mb-4 flex items-start gap-3">
        <span className="font-mono text-gold flex-shrink-0 mt-0.5 text-base" aria-hidden="true">
          ✦
        </span>
        <div>
          <p className="font-sans text-paper text-sm font-semibold mb-0.5">
            Garantia de 7 dias
          </p>
          <p className="font-sans text-paper-dim text-xs leading-relaxed">
            Se não gostar por qualquer motivo nos primeiros 7 dias, devolvemos seu dinheiro. Sem perguntas.
          </p>
        </div>
      </div>

      {/* Outer stamp border */}
      <div className="border-2 border-gold p-1.5">
        {/* Inner stamp border */}
        <div className="border border-gold/35 p-6 sm:p-8 text-center bg-ink-deep relative">
          {/* Corner marks */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30" aria-hidden="true" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30" aria-hidden="true" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30" aria-hidden="true" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30" aria-hidden="true" />

          <p className="font-mono text-gold/60 text-xs tracking-[0.2em] uppercase mb-6">
            {badge}
          </p>

          {/* Price */}
          <div
            className="flex items-start justify-center gap-1 mb-1"
            aria-label={`${sym}${whole} por mês após o período de teste`}
          >
            <span className="font-mono text-gold/70 text-sm mt-3" aria-hidden="true">
              {sym}
            </span>
            <span
              className="font-mono text-gold font-bold text-6xl sm:text-7xl leading-none"
              aria-hidden="true"
            >
              {whole}
            </span>
          </div>
          <p className="font-mono text-paper-muted text-sm mb-6 tracking-wider">
            por mês
          </p>

          <div className="border-t border-gold/20 my-4" />

          <p className="font-sans text-paper-dim text-sm mb-4">{annualLine}</p>

          {/* Extra exclusive benefit */}
          {extra && (
            <div className="border border-gold/30 bg-gold/8 rounded-sm px-4 py-3 mb-6 text-left">
              <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-1">
                Exclusivo neste plano
              </p>
              <p className="font-sans text-paper text-sm font-medium leading-snug">
                + {extra}
              </p>
            </div>
          )}

          <SignupForm />
        </div>
      </div>
    </div>
  )
}

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
            Simples assim
          </h2>
          <p className="font-sans text-paper-dim text-sm mt-3 max-w-sm mx-auto">
            Comece com uma reunião gratuita. Assine só se fizer sentido para você.
          </p>
        </header>

        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <PlanCard
              region="LIBRIX ACADEMY"
              badge="Plano Mensal · 7 dias grátis"
              sym="€"
              whole="49"
              annualLine="Prefere anual? € 469/ano — 2+ meses grátis"
              extra="Pacotes prontos de planejamento para lançamento do seu livro"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
