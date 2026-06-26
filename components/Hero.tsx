import Bookshelf from './Bookshelf'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col justify-center pt-16 px-4 sm:px-6"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto w-full py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-gold/70 text-xs sm:text-sm tracking-widest uppercase mb-5">
            Clube do Autor · LIBRIX HUB
          </p>

          <h1
            id="hero-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-paper leading-tight mb-6 text-balance"
          >
            Tudo que você precisa para{' '}
            <em className="not-italic text-gold">
              publicar bem na Amazon
            </em>
          </h1>

          <p className="font-sans text-base sm:text-lg text-paper-dim max-w-xl mb-10 leading-relaxed">
            O Clube do Autor LIBRIX HUB é a assinatura mensal que entrega
            templates, checklists, revisões e consultoria personalizada para autores
            independentes que publicam na Amazon KDP.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#planos"
              className="bg-gold text-ink font-sans font-bold text-base px-8 py-3 rounded text-center hover:bg-gold-light transition-colors duration-200"
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
