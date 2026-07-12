const DEMO_URL = 'https://www.aphoenixauthor.com'
const WA_CTA =
  'https://wa.me/5532998491620?text=Quero+um+site+de+autor+como+esse'

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-ink-light border-y border-gold/10"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Browser-frame preview */}
          <div className="lg:col-span-3 rounded-sm overflow-hidden border border-gold/20 bg-ink shadow-glow-purple-sm">
            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-gold/10 bg-ink-mid">
              <span className="w-2.5 h-2.5 rounded-full bg-terra/40" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-gold/40" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-paper/20" aria-hidden="true" />
              <span className="ml-3 font-mono text-paper-muted text-[10px] truncate">
                aphoenixauthor.com
              </span>
            </div>
            <div
              className="relative overflow-hidden aspect-[16/10]"
              aria-hidden="true"
            >
              <iframe
                src={DEMO_URL}
                title="Prévia do site aphoenixauthor.com"
                tabIndex={-1}
                loading="lazy"
                className="absolute top-0 left-0 border-0 pointer-events-none"
                style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: '0 0' }}
              />
            </div>
          </div>

          {/* Caption + CTA */}
          <div className="lg:col-span-2">
            <p className="font-mono text-gold/60 text-[10px] tracking-widest uppercase mb-3">
              Veja um site que já entregamos
            </p>
            <h2
              id="portfolio-heading"
              className="font-serif text-xl sm:text-2xl font-bold text-paper mb-4 leading-tight"
            >
              Site de autora, feito pela LIBRIX ACADEMY
            </h2>
            <p className="font-sans text-paper-dim text-sm leading-relaxed mb-7">
              Site desenvolvido para autora de ficção sobrenatural — inclui blog,
              apresentação de obras e loja integrada. Um exemplo real do que
              construímos para autores.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold text-ink-deep font-sans font-semibold text-sm px-6 py-3 rounded hover:bg-gold-light transition-colors duration-200"
              >
                Quero um site assim
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gold/25 text-gold font-sans font-semibold text-sm px-6 py-3 rounded hover:border-gold/50 hover:text-gold-light transition-colors duration-200"
              >
                Ver site completo
                <span className="font-mono" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
