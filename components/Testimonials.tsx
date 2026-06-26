const TESTIMONIALS = [
  {
    quote:
      'O checklist mudou minha forma de publicar. Antes eu sempre esquecia alguma etapa e tinha que corrigir depois do upload no KDP. Agora publico tranquila e no prazo.',
    name: 'Ana Rodrigues',
    role: 'Autora de romance · São Paulo',
    initials: 'AR',
  },
  {
    quote:
      'O feedback na minha capa foi decisivo para o lançamento. Em duas semanas o livro quase dobrou o CTR nas buscas da Amazon. Vale muito mais do que o valor cobrado.',
    name: 'Carlos Mendes',
    role: 'Autor de não-ficção · Lisboa',
    initials: 'CM',
  },
  {
    quote:
      'Como autora portuguesa estava perdida nas especificidades do mercado europeu. O Clube me deu o suporte que precisava, num valor que cabe no orçamento.',
    name: 'Sofia Costa',
    role: 'Autora de autoajuda · Porto',
    initials: 'SC',
  },
]

export default function Testimonials() {
  return (
    <section
      className="py-24 px-4 sm:px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            Quem já é do Clube
          </p>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            O que os membros dizem
          </h2>
        </header>

        <ul
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          role="list"
        >
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="border border-gold/15 rounded-sm p-6 bg-ink-light flex flex-col gap-5"
            >
              {/* Quote */}
              <blockquote className="flex-1">
                <span
                  className="font-serif text-gold/30 text-4xl leading-none block mb-2 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-sans text-paper-dim text-sm leading-relaxed">
                  {t.quote}
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                <div
                  className="w-9 h-9 rounded-full bg-ink-mid border border-gold/25 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-mono text-gold text-xs font-semibold">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-paper text-sm font-semibold leading-tight">
                    {t.name}
                  </p>
                  <p className="font-mono text-paper-muted text-xs mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
