import Link from 'next/link'

const WA_URL =
  'https://wa.me/5532998491620?text=Quero+entrar+no+Clube+do+Autor+LIBRIX+HUB'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-sm border-b border-gold/20">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Navegação principal"
      >
        <Link
          href="/"
          className="flex items-baseline gap-1.5"
          aria-label="LIBRIX HUB — página inicial"
        >
          <span className="font-serif text-xl font-bold text-gold tracking-wider">
            LIBRIX
          </span>
          <span className="font-sans text-xs text-paper/50 font-normal tracking-widest uppercase">
            HUB
          </span>
        </Link>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-terra text-paper font-sans text-sm font-semibold px-4 py-2 rounded hover:bg-terra-light transition-colors duration-200"
        >
          Entrar no Clube
        </a>
      </nav>
    </header>
  )
}
