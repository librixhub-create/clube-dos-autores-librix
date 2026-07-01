const STEPS = [
  {
    num: '01',
    title: 'Agende uma reunião gratuita',
    body: 'Preencha o formulário com seu nome e escolha o melhor dia e horário. Você é redirecionado para o WhatsApp — confirmamos em minutos.',
  },
  {
    num: '02',
    title: 'Conheça o Clube na call',
    body: 'Em uma reunião rápida apresentamos tudo que você vai receber como membro. Tire suas dúvidas, sem compromisso de assinatura.',
  },
  {
    num: '03',
    title: 'Assine e publique com mais confiança',
    body: 'Decidiu assinar? Acesse todos os materiais imediatamente e comece a publicar melhor na Amazon KDP — com 7 dias de garantia.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-24 px-4 sm:px-6 bg-ink-light"
      aria-labelledby="hiw-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            É simples assim
          </p>
          <h2
            id="hiw-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Como funciona
          </h2>
        </header>

        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6" role="list">
          {STEPS.map((step, idx) => (
            <li key={step.num} className="flex flex-col">
              {/* Connector line — desktop only */}
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-gold font-bold text-4xl leading-none select-none">
                  {step.num}
                </span>
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden sm:block flex-1 h-px bg-gold/20"
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3 className="font-serif text-lg font-semibold text-paper mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-paper-dim text-sm leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        {/* CTA inline */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#planos"
            className="bg-gold text-white font-sans font-bold text-base px-8 py-3 rounded hover:bg-gold-light transition-colors duration-200"
          >
            Agendar reunião gratuita
          </a>
          <p className="font-sans text-paper-muted text-xs">
            Sem compromisso · 7 dias grátis após assinar
          </p>
        </div>
      </div>
    </section>
  )
}
