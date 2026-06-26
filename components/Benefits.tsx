type Benefit = {
  mark: string
  title: string
  body: string
}

const BENEFITS: Benefit[] = [
  {
    mark: '§',
    title: 'Templates sempre atualizados',
    body: 'Capa, descrição e roteiro de lançamento: materiais profissionais alinhados às melhores práticas da Amazon KDP, sempre frescos.',
  },
  {
    mark: '✓',
    title: 'Checklist de publicação KDP',
    body: 'Checklist completo e atualizado para garantir que seu livro seja publicado sem erros — nunca mais esqueça um passo.',
  },
  {
    mark: '◎',
    title: '1 revisão mensal',
    body: 'Todo mês, você envia sua capa ou descrição e recebe um feedback especializado para publicar com mais confiança.',
  },
  {
    mark: '⬡',
    title: 'Consultoria personalizada via call',
    body: 'Sessão individual por videochamada para tirar dúvidas, revisar sua estratégia ou planejar seu próximo lançamento.',
  },
  {
    mark: '%',
    title: '20% de desconto em consultorias',
    body: 'Membros do Clube têm 20% de desconto em qualquer consultoria avulsa da LIBRIX HUB — direto no preço, sem cupom.',
  },
  {
    mark: '∞',
    title: 'Cancelamento livre',
    body: 'Sem fidelidade, sem prazo mínimo, sem burocracia. Cancele quando quiser — sem multa e sem perguntas.',
  },
]

export default function Benefits() {
  return (
    <section
      id="beneficios"
      className="py-24 px-4 sm:px-6 bg-ink-light"
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            O que você recebe
          </p>
          <h2
            id="benefits-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Tudo num clube só
          </h2>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5" role="list">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit.title}
              className="border border-gold/15 rounded-sm p-6 bg-ink hover:border-gold/35 transition-colors duration-200"
            >
              <span
                className="font-mono text-2xl text-gold block mb-4 select-none"
                aria-hidden="true"
              >
                {benefit.mark}
              </span>
              <h3 className="font-serif text-lg font-semibold text-paper mb-2">
                {benefit.title}
              </h3>
              <p className="font-sans text-paper-dim text-sm leading-relaxed">
                {benefit.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
