import Link from 'next/link'
import LanguagePicker from './LanguagePicker'

const WA_URL =
  'https://wa.me/5532998491620?text=Quero+entrar+na+LIBRIX+ACADEMY'

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
          aria-label="LIBRIX ACADEMY — página inicial"
        >
          <span className="font-serif text-xl font-bold text-gold tracking-wider">
            LIBRIX
          </span>
          <span className="font-sans text-xs text-paper/50 font-normal tracking-widest uppercase">
            HUB
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://www.librixhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-paper-dim text-sm hover:text-gold transition-colors duration-200 hidden sm:block"
          >
            librixhub.com
          </a>
          <Link
            href="/calculadoras"
            className="font-sans text-paper-dim text-sm hover:text-gold transition-colors duration-200 hidden sm:block"
          >
            Ferramentas
          </Link>
          <LanguagePicker />
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-terra text-paper font-sans text-sm font-semibold px-4 py-2 rounded hover:bg-terra-light transition-colors duration-200"
          >
            Entrar na Academy
          </a>
        </div>
      </nav>
    </header>
  )
}
