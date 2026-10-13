import Bookshelf from './Bookshelf'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col justify-center pt-24 px-4 sm:px-6"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto w-full py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-gold/70 text-xs sm:text-sm tracking-widest uppercase mb-5">
            LIBRIX ACADEMY · Publicação &amp; Presença Digital para Autores
          </p>

          <h1
            id="hero-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-paper leading-tight mb-6 text-balance"
          >
            Publique.{' '}
            <em className="not-italic text-gold">Apareça. Venda.</em>
          </h1>

          <p className="font-sans text-base sm:text-lg text-paper-dim max-w-xl mb-6 leading-relaxed">
            A LIBRIX ACADEMY cuida dos dois pilares da carreira do autor
            independente: publicamos seu livro com qualidade profissional na
            Amazon KDP e construímos sua casa digital — site com blog, loja
            integrada e SEO — para você ser encontrado e vender mais.
          </p>

          {/* Geographic availability */}
          <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/5 rounded-sm px-3 py-1.5 mb-5">
            <span className="font-mono text-gold text-xs flex-shrink-0" aria-hidden="true">◉</span>
            <p className="font-sans text-paper-dim text-xs leading-snug">
              Exclusivo para{' '}
              <span className="text-paper font-medium">Portugal, Espanha, Itália</span>
              {' '}e outros países da Europa
            </p>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mb-10" aria-label="Mais de 45 autores já no Clube">
            <div className="flex -space-x-1.5" aria-hidden="true">
              {['AR', 'CM', 'SC'].map((initials) => (
                <div
                  key={initials}
                  className="w-7 h-7 rounded-full bg-ink-mid border-2 border-ink flex items-center justify-center"
                >
                  <span className="font-mono text-gold text-[9px] font-semibold">{initials}</span>
                </div>
              ))}
            </div>
            <p className="font-sans text-paper-dim text-sm">
              <span className="text-paper font-semibold">+45 autores</span> já publicando e com presença digital pela Academy
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#planos"
              className="bg-gold text-ink-deep font-sans font-bold text-base px-8 py-3 rounded text-center hover:bg-gold-light transition-colors duration-200"
            >
              Ver planos
            </a>
            <a
              href="#beneficios"
              className="border border-gold/40 text-gold font-sans font-semibold text-base px-8 py-3 rounded text-center hover:border-gold/80 hover:text-gold-light transition-colors duration-200"
            >
              Ver benefícios
            </a>
          </div>
          <a
            href="/calculadoras"
            className="inline-flex items-center gap-2 mt-5 font-sans text-paper-dim text-sm hover:text-gold transition-colors duration-200 group"
          >
            <span className="font-mono text-gold/50 group-hover:text-gold transition-colors duration-200" aria-hidden="true">⊕</span>
            Acessar ferramentas gratuitas do autor
            <span className="font-mono text-gold/40 group-hover:text-gold transition-colors duration-200" aria-hidden="true">→</span>
          </a>
          <p className="font-sans text-paper-muted text-xs mt-3">
            Reunião gratuita · 7 dias grátis após assinar · Cancele quando quiser
          </p>
        </div>

        <div className="mt-20 sm:mt-24">
          <p className="font-mono text-paper-muted text-xs tracking-wider uppercase mb-5">
            O que você recebe todo mês
          </p>
          <Bookshelf />
        </div>
      </div>
    </section>
  )
}
