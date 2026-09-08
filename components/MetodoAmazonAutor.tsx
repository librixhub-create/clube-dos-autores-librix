import MetodoForm from './MetodoForm'

const INCLUDES = [
  'Checklist Completo de Publicação na Amazon KDP',
  'Aula Gravada Passo a Passo',
  'Checklist de Estratégias de Lançamento',
  'Material de Vendas Automáticas',
  'Material de Apoio Extra (templates e guias rápidos)',
  'Acesso imediato após a confirmação do pagamento',
]

export default function MetodoAmazonAutor() {
  return (
    <section
      id="metodo"
      className="py-20 sm:py-24 px-4 sm:px-6"
      aria-labelledby="metodo-heading"
    >
      <div className="max-w-4xl mx-auto shadow-glow-purple">
        {/* Outer stamp border */}
        <div className="border-2 border-gold p-1.5">
          <div className="border border-gold/35 bg-ink-deep relative">

            {/* Corner marks */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30" aria-hidden="true" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30" aria-hidden="true" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30" aria-hidden="true" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gold/15">

              {/* Left — pitch + includes */}
              <div className="px-8 py-10">
                <p className="font-mono text-gold/60 text-[10px] tracking-widest uppercase mb-3">
                  Oferta em destaque
                </p>
                <h2
                  id="metodo-heading"
                  className="font-serif text-2xl sm:text-3xl font-bold text-paper mb-3 leading-tight"
                >
                  Método Amazon Autor
                </h2>
                <p className="font-sans text-paper-dim text-sm leading-relaxed mb-7">
                  Tudo o que você precisa para publicar e vender o seu livro
                  na Amazon, num único pacote.
                </p>

                <ul className="space-y-3" role="list">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-mono text-gold text-xs flex-shrink-0 mt-0.5" aria-hidden="true">
                        ✓
                      </span>
                      <span className="font-sans text-paper text-sm leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — form */}
              <div className="px-8 py-10 flex flex-col justify-center">
                <p className="font-mono text-paper-muted text-xs tracking-wide uppercase mb-6 text-center md:text-left">
                  Peça acesso e fale com a gente
                </p>

                <MetodoForm />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
