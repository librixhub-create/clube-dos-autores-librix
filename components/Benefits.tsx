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
    mark: '☰',
    title: 'Guia Completo de Publicação KDP',
    body: 'Guia passo a passo com tudo que você precisa saber para publicar na Amazon KDP — formatação, preços, palavras-chave, categorias e estratégia de visibilidade.',
  },
  {
    mark: '◆',
    title: 'Kit de Funil para Lançamento',
    body: 'Material completo para lançar com impacto: cronograma de pré-lançamento, escopo de campanha, estratégia de posicionamento e organização de cada etapa do planejamento.',
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
    mark: '⊕',
    title: 'Site + blog profissional com 15% OFF',
    body: 'Membros da Academy têm 15% de desconto na criação de um site com blog profissional para divulgar seus livros e construir presença digital como autor publicado.',
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
            Tudo na sua academia
          </h2>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5" role="list">
          {BENEFITS.map((benefit, idx) => (
            <li
              key={benefit.title}
              className={
                'border border-gold/15 rounded-sm p-6 bg-ink hover:border-gold/35 transition-colors duration-200' +
                (idx === BENEFITS.length - 1 && BENEFITS.length % 2 !== 0
                  ? ' sm:col-span-2'
                  : '')
              }
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
