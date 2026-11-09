const PRICE = '749 €'
const WA_URL = `https://wa.me/5532998491620?text=${encodeURIComponent(
  `Olá! Quero adquirir o Plano Completo por ${PRICE}.`
)}`
const WA_DOUBTS = `https://wa.me/5532998491620?text=${encodeURIComponent(
  'Olá! Vi o Plano Completo na LIBRIX ACADEMY e quero saber mais.'
)}`

const ITEMS = [
  { title: 'Edição Profissional', body: 'Revisão, diagramação e capa completa' },
  { title: 'Tradução Completa', body: 'Seu livro em inglês com qualidade nativa' },
  { title: 'Publicação Global', body: 'Kindle, paperback e capa dura' },
  { title: 'Audiobook', body: 'Narração profissional' },
  { title: 'Site do Autor', body: 'Site profissional para o seu livro' },
  { title: 'Consultoria & Marketing', body: 'Estratégias de vendas para o seu livro' },
]

/**
 * Oferta principal do site: logo abaixo do Hero ("Publique. Apareça. Venda.").
 * Mesmo plano (e preço) da loja www.librixapp.com.
 */
export default function PlanoCompleto() {
  return (
    <section
      id="plano-completo"
      className="pt-10 sm:pt-6 pb-12 px-4 sm:px-6"
      aria-labelledby="plano-completo-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-sm border-2 border-gold bg-ink-deep shadow-glow-purple overflow-hidden">
          <span className="absolute top-0 left-6 sm:left-10 -translate-y-px bg-gold text-ink-deep font-mono text-[10px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-b-sm font-bold">
            Oferta especial · O plano que engloba tudo
          </span>

          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 px-6 sm:px-10 pt-14 pb-10 sm:pb-12">
            <div>
              <h2
                id="plano-completo-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-paper leading-tight text-balance mb-3"
              >
                Plano <em className="not-italic text-gold">Completo</em>
              </h2>
              <p className="font-sans text-paper-dim text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                O plano que engloba tudo: edite, traduza, publique e divulgue o
                seu livro e tenha o seu site de autor — sem contratar cada
                serviço separadamente.
              </p>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4" role="list">
                {ITEMS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="font-mono text-gold text-sm flex-shrink-0 mt-0.5" aria-hidden="true">
                      ✓
                    </span>
                    <span className="font-sans text-sm leading-snug">
                      <strong className="block text-paper font-semibold">{item.title}</strong>
                      <span className="text-paper-dim">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center rounded-sm border border-gold/40 bg-gold/5 px-6 py-8 text-center">
              <p className="font-mono text-gold/70 text-xs tracking-widest uppercase mb-3">
                Tudo isso por apenas
              </p>
              <p className="font-serif text-6xl sm:text-7xl font-bold text-gold leading-none mb-3">
                {PRICE}
              </p>
              <p className="font-sans text-paper-dim text-sm mb-1">
                ou parcele em até <span className="text-paper font-semibold">3x sem juros</span>
              </p>
              <p className="font-sans text-paper-muted text-xs mb-7">
                Prazo de 60 a 90 dias · também em até 5x com juros
              </p>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-ink-deep font-sans font-bold text-base px-8 py-3.5 rounded text-center hover:bg-gold-light transition-colors duration-200"
              >
                Quero o Plano Completo
              </a>
              <a
                href={WA_DOUBTS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 font-sans text-sm text-gold hover:text-gold-light transition-colors duration-200"
              >
                Tirar dúvidas no WhatsApp
              </a>

              <p className="font-mono text-paper-muted text-[10px] tracking-wider uppercase mt-6">
                Pagamento parcelado · Atendimento direto · Garantia Librix
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
