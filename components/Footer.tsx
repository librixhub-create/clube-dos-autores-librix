const WA_CTA =
  'https://wa.me/5532998491620?text=Quero+assinar+o+Clube+do+Autor+LIBRIX+HUB'
const WA_CONTACT = 'https://wa.me/5532998491620'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-ink-deep border-t border-gold/20 pt-20 pb-10 px-4 sm:px-6"
      aria-label="Rodapé"
    >
      <div className="max-w-6xl mx-auto">
        {/* Final CTA block */}
        <div className="text-center mb-16">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-4">
            Comece hoje
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-paper mb-4 text-balance">
            Pronto para publicar com mais confiança?
          </h2>
          <p className="font-sans text-paper-dim text-base sm:text-lg mb-8 max-w-md mx-auto">
            Entre para o Clube do Autor e tenha tudo que precisa por €49/mês.
          </p>
          <a
            href={WA_CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-terra text-paper font-sans font-bold text-base px-10 py-4 rounded hover:bg-terra-light transition-colors duration-200"
          >
            Entrar no Clube agora
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-serif text-gold text-lg font-bold tracking-widest">
            LIBRIX HUB
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={WA_CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-paper-dim text-sm hover:text-gold transition-colors duration-200"
              aria-label="Contato via WhatsApp: +55 32 99849-1620"
            >
              +55 32 99849-1620
            </a>
            <span className="hidden sm:inline text-gold/20" aria-hidden="true">
              ·
            </span>
            <a
              href="mailto:librixhub@gmail.com"
              className="font-mono text-paper-dim text-sm hover:text-gold transition-colors duration-200"
            >
              librixhub@gmail.com
            </a>
          </div>

          <p className="font-sans text-paper-muted text-xs">
            © {year} LIBRIX HUB. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
