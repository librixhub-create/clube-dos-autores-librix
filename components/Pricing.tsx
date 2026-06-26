const WA_BRL =
  'https://wa.me/5532998491620?text=Quero+assinar+o+Clube+do+Autor+LIBRIX+HUB'
const WA_EUR =
  'https://wa.me/5532998491620?text=Olá!+Quero+assinar+o+Clube+do+Autor+LIBRIX+HUB+—+plano+Europa+(€29%2Fmês)'

interface PlanCardProps {
  region: string
  badge: string
  sym: string
  whole: string
  cents?: string
  annualLine: string
  cta: string
  waUrl: string
}

function PlanCard({
  region,
  badge,
  sym,
  whole,
  cents,
  annualLine,
  cta,
  waUrl,
}: PlanCardProps) {
  return (
    <div>
      <p className="font-mono text-paper-muted text-xs tracking-widest uppercase mb-3 text-center">
        {region}
      </p>
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
            aria-label={`${sym}${whole}${cents ?? ''} por mês`}
          >
            <span
              className="font-mono text-gold/70 text-sm mt-3"
              aria-hidden="true"
            >
              {sym}
            </span>
            <span
              className="font-mono text-gold font-bold text-6xl sm:text-7xl leading-none"
              aria-hidden="true"
            >
              {whole}
            </span>
            {cents && (
              <span
                className="font-mono text-gold/90 text-2xl mt-3"
                aria-hidden="true"
              >
                {cents}
              </span>
            )}
          </div>
          <p className="font-mono text-paper-muted text-sm mb-6 tracking-wider">
            por mês
          </p>

          <div className="border-t border-gold/20 my-4" />

          <p className="font-sans text-paper-dim text-sm mb-6">{annualLine}</p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gold text-ink font-sans font-bold text-base py-3 px-6 rounded text-center hover:bg-gold-light transition-colors duration-200"
          >
            {cta}
          </a>

          <p className="font-sans text-paper-muted text-xs mt-3">
            Sem fidelidade · Cancele quando quiser
          </p>
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
            Mesmo clube, mesma qualidade — escolha a moeda que funciona para você.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <PlanCard
            region="Brasil"
            badge="Plano Mensal"
            sym="R$"
            whole="34"
            cents=",90"
            annualLine="Prefere anual? R$ 297/ano — 2 meses grátis"
            cta="Quero assinar agora"
            waUrl={WA_BRL}
          />
          <PlanCard
            region="Europa"
            badge="Plano Mensal"
            sym="€"
            whole="29"
            annualLine="Prefere anual? € 249/ano — 2+ meses grátis"
            cta="Quero assinar agora"
            waUrl={WA_EUR}
          />
        </div>
      </div>
    </section>
  )
}
