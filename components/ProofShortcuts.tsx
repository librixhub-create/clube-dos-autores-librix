export default function ProofShortcuts() {
  return (
    <div className="px-4 sm:px-6 py-8 bg-ink-mid border-y border-gold/15">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="#livros"
          className="w-full sm:w-auto text-center font-sans font-semibold text-sm bg-gold text-ink-deep px-7 py-3.5 rounded-sm shadow-lg shadow-gold/20 hover:bg-gold-light transition-colors"
        >
          Ver livros publicados de autores em destaque →
        </a>
        <a
          href="#depoimentos"
          className="w-full sm:w-auto text-center font-sans font-semibold text-sm border border-gold/40 text-gold px-7 py-3.5 rounded-sm hover:bg-gold/10 transition-colors"
        >
          Ver depoimentos de clientes
        </a>
      </div>
    </div>
  )
}
