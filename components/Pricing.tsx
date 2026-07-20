import SignupForm from './SignupForm'

const WA_BASE = 'https://wa.me/5532998491620'

function waLink(planName: string, price?: string) {
  const msg = price
    ? `Olá! Quero adquirir o ${planName} por ${price}.`
    : `Olá! Quero saber mais sobre o plano ${planName} da LIBRIX ACADEMY.`
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`
}

type Plan = {
  name: string
  audience: string
  price?: string
  includes: string[]
  cta: string
  highlight?: boolean
}

const PUBLICATION_PLANS: Plan[] = [
  {
    name: 'Método Amazon Autor',
    audience: 'Para quem quer começar sozinho, com o passo a passo pronto',
    price: '€10',
    includes: [
      'Checklist Completo de Publicação na Amazon KDP',
      'Aula Gravada Passo a Passo',
      'Checklist de Estratégias de Lançamento',
      'Material de Vendas Automáticas',
      'Material de Apoio Extra (templates e guias rápidos)',
    ],
    cta: 'Quero o Método por €10',
  },
  {
    name: 'Publicação Start',
    audience: 'Para quem está lançando o primeiro livro',
    includes: [
      'Revisão de texto (1 rodada)',
      'Diagramação padrão',
      'Capa profissional (1 conceito)',
      'Publicação completa na Amazon KDP',
    ],
    cta: 'Quero publicar',
  },
  {
    name: 'Publicação Completa',
    audience: 'Para quem quer um lançamento mais robusto',
    includes: [
      'Tudo do Publicação Start',
      'Revisão aprofundada (2 rodadas)',
      'Diagramação premium',
      'Capa com até 3 conceitos',
      'ISBN (quando aplicável)',
      'Checklist e guia de metadados KDP',
    ],
    cta: 'Publicar com mais suporte',
    highlight: true,
  },
  {
    name: 'Publicação + Academy',
    audience: 'Para quem quer publicar e ter suporte contínuo todo mês',
    includes: [
      'Tudo do Publicação Completa',
      'Templates mensais de capa e lançamento',
      '10 artes de social media por mês',
      'Consultoria mensal via call',
      '7 dias grátis · cancelamento livre',
    ],
    cta: 'Assinar a Academy',
  },
]

const SITE_PLANS: Plan[] = [
  {
    name: 'Site Essencial',
    audience: 'Para quem precisa de presença digital simples e profissional',
    includes: [
      'Site de 1 página (bio, livros, contato)',
      'Domínio próprio',
      'Hospedagem inclusa',
      'SEO básico',
    ],
    cta: 'Quero meu site',
  },
  {
    name: 'Site + Blog',
    audience: 'Para quem quer publicar conteúdo e crescer audiência',
    includes: [
      'Tudo do Site Essencial',
      'Blog integrado com categorias',
      'SEO avançado',
      'Newsletter opcional',
    ],
    cta: 'Quero site com blog',
    highlight: true,
  },
  {
    name: 'Site + Loja do Autor',
    audience: 'Para quem quer vender e divulgar livros direto pelo site',
    includes: [
      'Tudo do Site + Blog',
      'Integração com Amazon Author Page',
      'Botões de compra por livro',
      'Páginas individuais de cada obra',
    ],
    cta: 'Quero vender pelo meu site',
  },
]

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={
        'relative flex flex-col rounded-sm p-7 transition-colors duration-200 ' +
        (plan.highlight
          ? 'bg-ink-light border border-gold/40 shadow-glow-purple-sm'
          : 'bg-ink border border-gold/10 hover:border-gold/25')
      }
    >
      {plan.highlight && (
        <span className="absolute top-0 right-6 -translate-y-1/2 font-mono text-ink-deep bg-gold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm">
          Mais escolhido
        </span>
      )}

      <h4 className="font-serif text-xl font-semibold text-paper mb-1.5">
        {plan.name}
      </h4>
      <p
        className={
          'font-sans text-paper-muted text-xs leading-relaxed mb-6' +
          (plan.price ? '' : ' pb-6 border-b border-gold/10')
        }
      >
        {plan.audience}
      </p>

      {plan.price && (
        <div className="mb-6 pb-6 border-b border-gold/10">
          <span className="font-mono text-gold font-bold text-2xl leading-none">
            {plan.price}
          </span>
        </div>
      )}

      <ul className="space-y-3 mb-8 flex-1" role="list">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="font-mono text-gold/50 text-xs flex-shrink-0 mt-0.5" aria-hidden="true">
              ✓
            </span>
            <span className="font-sans text-paper-dim text-[13px] leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={waLink(plan.name, plan.price)}
        target="_blank"
        rel="noopener noreferrer"
        className={
          'font-sans font-semibold text-sm px-5 py-3 rounded text-center transition-colors duration-200 ' +
          (plan.highlight
            ? 'bg-gold text-ink-deep hover:bg-gold-light'
            : 'text-gold hover:text-gold-light border border-gold/25 hover:border-gold/50')
        }
      >
        {plan.cta}
      </a>
    </div>
  )
}

function Track({
  eyebrow,
  title,
  description,
  plans,
  columns = 3,
}: {
  eyebrow: string
  title: string
  description: string
  plans: Plan[]
  columns?: 3 | 4
}) {
  return (
    <div className="mb-24 last:mb-0">
      <div className="mb-10">
        <p className="font-mono text-gold/60 text-[10px] tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper mb-3">
          {title}
        </h3>
        <p className="font-sans text-paper-dim text-sm max-w-lg leading-relaxed">
          {description}
        </p>
      </div>

      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch ' +
          (columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')
        }
      >
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section
      id="planos"
      className="py-24 px-4 sm:px-6"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14 text-center">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            Planos
          </p>
          <h2
            id="pricing-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Duas trilhas. Um único parceiro.
          </h2>
          <p className="font-sans text-paper-dim text-sm mt-3 max-w-md mx-auto">
            Escolha publicar seu livro, construir seu site de autor, ou seguir
            os dois caminhos. Fale com a gente e receba uma proposta sob medida.
          </p>
        </header>

        <Track
          eyebrow="Trilha 1"
          title="Planos de Publicação"
          description="Revisão, diagramação, capa e publicação na Amazon KDP — do arquivo final ao livro no ar."
          plans={PUBLICATION_PLANS}
          columns={4}
        />

        <Track
          eyebrow="Trilha 2"
          title="Planos de Criação de Site para Autores"
          description="Site com blog, domínio, hospedagem, integração com sua loja de livros e SEO básico — sua casa digital como autor."
          plans={SITE_PLANS}
        />

        {/* Bottom CTA — schedule call */}
        <div className="mt-24 max-w-2xl mx-auto shadow-glow-purple rounded-sm">
          <div className="border border-gold/30 bg-ink-deep rounded-sm px-6 py-10 sm:px-12 sm:py-12 text-center">
            <p className="font-mono text-gold/60 text-xs tracking-[0.2em] uppercase mb-3">
              Ainda não decidiu?
            </p>
            <h3 className="font-serif text-2xl font-bold text-paper mb-2">
              Fale com a gente numa reunião gratuita
            </h3>
            <p className="font-sans text-paper-dim text-sm mb-6 max-w-sm mx-auto">
              Apresentamos as duas trilhas, tiramos suas dúvidas e ajudamos
              você a escolher o plano certo. Sem compromisso.
            </p>

            <div className="border border-gold/25 bg-gold/5 rounded-sm px-4 py-3 flex items-start gap-3 mb-6 text-left max-w-sm mx-auto">
              <span className="font-mono text-gold flex-shrink-0 mt-0.5" aria-hidden="true">✦</span>
              <div>
                <p className="font-sans text-paper text-sm font-semibold mb-0.5">
                  Garantia de 7 dias
                </p>
                <p className="font-sans text-paper-dim text-xs leading-relaxed">
                  Se não gostar nos primeiros 7 dias, devolvemos seu dinheiro. Sem perguntas.
                </p>
              </div>
            </div>

            <div className="max-w-sm mx-auto text-left">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
