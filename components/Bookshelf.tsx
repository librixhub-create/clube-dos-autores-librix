type Book = {
  label: string
  bg: string
  edge: string
  height: number
}

const BOOKS: Book[] = [
  { label: 'Templates',     bg: '#8b6914', edge: '#6a5010', height: 128 },
  { label: 'Checklist KDP', bg: '#2d5a3d', edge: '#1e3d29', height: 106 },
  { label: 'Revisão',       bg: '#a8552f', edge: '#7d3d22', height: 148 },
  { label: 'Comunidade',    bg: '#4a5568', edge: '#2d3748', height: 116 },
  { label: 'Desconto',      bg: '#c9a24b', edge: '#a88538', height: 138 },
  { label: 'Liberdade',     bg: '#5a3e6b', edge: '#3d2852', height: 100 },
]

export default function Bookshelf() {
  return (
    <div>
      <div
        className="flex items-end gap-2 sm:gap-3 overflow-x-auto"
        role="img"
        aria-label="Estante com os seis benefícios do Clube do Autor: Templates, Checklist KDP, Revisão, Comunidade, Desconto e Liberdade"
      >
        {BOOKS.map((book) => (
          <div
            key={book.label}
            className="relative flex-shrink-0 cursor-default transition-transform duration-300 ease-out hover:-translate-y-3 w-9 sm:w-12"
            style={{ height: book.height }}
          >
            {/* main spine */}
            <div
              className="absolute inset-0 rounded-sm shadow-lg"
              style={{ backgroundColor: book.bg }}
            />
            {/* left edge depth */}
            <div
              className="absolute inset-y-0 left-0 w-1.5 rounded-l-sm"
              style={{ backgroundColor: book.edge }}
            />
            {/* top highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-white/20 rounded-t-sm" />
            {/* vertical title */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <span
                className="font-serif text-[9px] sm:text-[10px] text-white/90 font-semibold tracking-wider select-none"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {book.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* shelf line */}
      <div className="h-px bg-gold/25 mt-px" />
    </div>
  )
}
