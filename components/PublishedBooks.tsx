type PublishedBook = {
  title: string
  genre: string
  url: string
  cover: string
  coverEdge: string
}

const PUBLISHED_BOOKS: PublishedBook[] = [
  {
    title: 'O Pequeno Charlley',
    genre: 'Infantil',
    url: 'https://www.amazon.com.br/dp/B0H4P4CJ2H',
    cover: '#2d5a3d',
    coverEdge: '#1e3d29',
  },
  {
    title: 'Governe-se: Metanoia, a Ciência do Inconsciente',
    genre: 'Desenvolvimento pessoal',
    url: 'https://www.amazon.com.br/dp/B0HFGRBXVK',
    cover: '#4a5568',
    coverEdge: '#2d3748',
  },
  {
    title: 'Diário de uma Diarista',
    genre: 'Biografia',
    url: 'https://www.amazon.com.br/dp/B0HBLSBFV8',
    cover: '#a8552f',
    coverEdge: '#7d3d22',
  },
  {
    title: 'Entre Mundos: Um Chamado Phoenix',
    genre: 'Ficção',
    url: 'https://www.amazon.com.br/dp/B0H7VNSZB6',
    cover: '#5a3e6b',
    coverEdge: '#3d2852',
  },
  {
    title: 'The Inverted Rose',
    genre: 'Fantasia',
    url: 'https://www.amazon.com.br/dp/B0HH16JX4T',
    cover: '#8b6914',
    coverEdge: '#6a5010',
  },
  {
    title: 'Produtos do Setor Segurador para Empreendedores',
    genre: 'Negócios',
    url: 'https://www.amazon.com.br/dp/B0H42R4VKB',
    cover: '#c9a24b',
    coverEdge: '#a88538',
  },
  {
    title: 'Comfort Is Your Worst Enemy: Insecurity',
    genre: 'Autoajuda',
    url: 'https://www.amazon.com.br/dp/B0GVYVNWPF',
    cover: '#1e3329',
    coverEdge: '#0d1a13',
  },
]

export default function PublishedBooks() {
  return (
    <section
      className="py-24 px-4 sm:px-6 bg-ink-light border-y border-gold/10"
      aria-labelledby="published-books-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14 text-center">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            Prova real
          </p>
          <h2
            id="published-books-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Livros que já publicamos na Amazon
          </h2>
          <p className="font-sans text-paper-dim text-sm mt-3 max-w-lg mx-auto">
            Alguns dos livros de autores que passaram pela LIBRIX ACADEMY e
            estão à venda hoje, de verdade, na Amazon.
          </p>
        </header>

        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          role="list"
        >
          {PUBLISHED_BOOKS.map((book) => (
            <li key={book.url}>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-sm overflow-hidden border border-gold/15 bg-ink hover:border-gold/40 transition-colors duration-200"
              >
                <div
                  className="relative flex items-center justify-center h-28 sm:h-32 px-4"
                  style={{ backgroundColor: book.cover }}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ backgroundColor: book.coverEdge }}
                    aria-hidden="true"
                  />
                  <div className="absolute top-0 inset-x-0 h-px bg-white/20" aria-hidden="true" />
                  <span className="font-serif text-white text-sm font-semibold text-center leading-snug line-clamp-3">
                    {book.title}
                  </span>
                </div>
                <div className="flex flex-col flex-1 px-4 py-3.5">
                  <span className="font-mono text-gold/60 text-[10px] tracking-widest uppercase mb-2">
                    {book.genre}
                  </span>
                  <span className="mt-auto font-sans text-gold text-xs font-semibold group-hover:text-gold-light transition-colors duration-200">
                    Ver na Amazon
                    <span className="font-mono ml-1" aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
