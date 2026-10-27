import Image from 'next/image'

type PublishedBook = {
  title: string
  genre: string
  url: string
  cover: string
}

const PUBLISHED_BOOKS: PublishedBook[] = [
  {
    title: 'O Pequeno Charlley',
    genre: 'Infantil',
    url: 'https://www.amazon.com.br/dp/B0H4P4CJ2H',
    cover: '/covers/charlley.jpg',
  },
  {
    title: 'Governe-se: Metanoia, a Ciência do Inconsciente ao Altar',
    genre: 'Desenvolvimento pessoal',
    url: 'https://www.amazon.com.br/dp/B0HFGRBXVK',
    cover: '/covers/governese.jpg',
  },
  {
    title: 'O Diário de uma Diarista',
    genre: 'Romance',
    url: 'https://www.amazon.com.br/dp/B0HBLSBFV8',
    cover: '/covers/diariodiarista.jpg',
  },
  {
    title: 'Produtos do Setor Segurador para Empreendedores',
    genre: 'Negócios',
    url: 'https://www.amazon.com.br/dp/B0H42R4VKB',
    cover: '/covers/setorsegurador.jpg',
  },
  {
    title: 'Comfort Is Your Worst Enemy',
    genre: 'Autoajuda',
    url: 'https://www.amazon.com.br/dp/B0GVYVNWPF',
    cover: '/covers/comfort.jpg',
  },
  {
    title: '365 Questions About Life',
    genre: 'Desenvolvimento pessoal',
    url: 'https://www.amazon.com/dp/B0GYL2N8L1',
    cover: '/covers/365questions.jpg',
  },
  {
    title: 'Comunicación Poderosa',
    genre: 'Comunicação',
    url: 'https://www.amazon.com/dp/B0FY7Z3TB3',
    cover: '/covers/comunicacaopoderosa.jpg',
  },
  {
    title: 'Fé e Propósito: Agenda Devocional',
    genre: 'Espiritualidade',
    url: 'https://www.amazon.com/dp/B0GGZ9WS1W',
    cover: '/covers/feproposito.jpg',
  },
  {
    title: 'O Rosário Meditado',
    genre: 'Espiritualidade',
    url: 'https://www.amazon.com/dp/6502110142',
    cover: '/covers/rosariomeditado.jpg',
  },
  {
    title: 'Little Charlley: A little dog can change your life',
    genre: 'Infantil',
    url: 'https://www.amazon.com.br/dp/B0H4HWC16J',
    cover: '/covers/littlecharlley-en.jpg',
  },
  {
    title: 'Minhas Ovelhas Queridas: Uma História de Amor, Fé e Propósito',
    genre: 'Espiritualidade',
    url: 'https://www.amazon.com.br/dp/B0HKD5ZZ7G',
    cover: '/covers/ovelhasqueridas.jpg',
  },
  {
    title: 'A Força na Fraqueza',
    genre: 'Espiritualidade',
    url: 'https://www.amazon.com/dp/B0GZH8P7Y2',
    cover: '/covers/forcanafraqueza.jpg',
  },
  {
    title: 'Recalculando a Rota: O que a Tempestade Revela, Deus Já Havia Prometido',
    genre: 'Espiritualidade',
    url: 'https://www.amazon.com/dp/B0HK4Z51FZ',
    cover: '/covers/recalculandoarota.jpg',
  },
  {
    title: 'Perdão que Restaura Casamento',
    genre: 'Espiritualidade',
    url: 'https://www.amazon.com.br/dp/B0HM87J8XR',
    cover: '/covers/perdaorestaura.jpg',
  },
  {
    title: 'Life and Journey of an Entrepreneur',
    genre: 'Negócios',
    url: 'https://www.amazon.com/dp/B0HP8YR4JR',
    cover: '/covers/lifejourney.jpg',
  },
  {
    title: 'Ninguém Deve + Que Eu',
    genre: 'Desenvolvimento pessoal',
    url: 'https://www.amazon.com/dp/B0HNGZBPBK',
    cover: '/covers/ninguemdeve.jpg',
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
            Livros que já publicamos na Amazon — Em destaque
          </h2>
          <p className="font-sans text-paper-dim text-sm mt-3 max-w-lg mx-auto">
            Já publicamos dezenas de livros de autores que passaram pela
            LIBRIX ACADEMY — estes são apenas o destaque da semana, à venda
            hoje, de verdade, na Amazon.
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
                <div className="relative w-full aspect-[2/3] bg-ink-mid">
                  <Image
                    src={book.cover}
                    alt={`Capa do livro ${book.title}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 px-4 py-3.5">
                  <span className="font-serif text-paper text-sm font-semibold leading-snug mb-1.5">
                    {book.title}
                  </span>
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
