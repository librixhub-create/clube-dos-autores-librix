const WA_URL =
  'https://wa.me/5532998491620?text=Quero+assinar+o+Clube+do+Autor+LIBRIX+HUB'

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
        </header>

        <div className="flex justify-center">
          {/* Outer stamp border */}
          <div className="border-2 border-gold p-1.5 max-w-sm w-full">
            {/* Inner stamp border */}
            <div className="border border-gold/35 p-8 sm:p-10 text-center bg-ink-deep relative">
              {/* Corner marks */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30" aria-hidden="true" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30" aria-hidden="true" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30" aria-hidden="true" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30" aria-hidden="true" />

              <p className="font-mono text-gold/60 text-xs tracking-[0.2em] uppercase mb-8">
                Plano Mensal
              </p>

              {/* Price */}
              <div
                className="flex items-start justify-center gap-1 mb-1"
                aria-label="R$ 34,90 por mês"
              >
                <span className="font-mono text-gold/70 text-sm mt-3" aria-hidden="true">
                  R$
                </span>
                <span className="font-mono text-gold font-bold text-7xl sm:text-8xl leading-none" aria-hidden="true">
                  34
                </span>
                <span className="font-mono text-gold/90 text-3xl mt-4" aria-hidden="true">
                  ,90
                </span>
              </div>
              <p className="font-mono text-paper-muted text-sm mb-8 tracking-wider">
                por mês
              </p>

              <div className="border-t border-gold/20 my-6" />

              {/* Annual note */}
              <p className="font-sans text-paper-dim text-sm mb-8">
                Prefere anual?{' '}
                <strong className="text-paper font-semibold">R$ 297/ano</strong>
                {' '}— equivale a 2 meses grátis
              </p>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gold text-ink font-sans font-bold text-base py-3 px-6 rounded text-center hover:bg-gold-light transition-colors duration-200"
              >
                Quero assinar agora
              </a>

              <p className="font-sans text-paper-muted text-xs mt-4">
                Sem fidelidade · Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
