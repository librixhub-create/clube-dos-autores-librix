'use client'

import { useState } from 'react'

type Item = { id: string; label: string; detail: string }
type Phase = { id: string; title: string; subtitle: string; items: Item[] }

const PHASES: Phase[] = [
  {
    id: 'pre',
    title: 'Pré-lançamento',
    subtitle: '6 a 8 semanas antes da publicação',
    items: [
      { id: 'p1', label: 'Definir a data de publicação', detail: 'Escolha uma data com ao menos 6 semanas de margem para preparar tudo com calma.' },
      { id: 'p2', label: 'Revisar o manuscrito completo', detail: 'Gramática, ortografia, consistência de nomes e formatação interna do texto.' },
      { id: 'p3', label: 'Formatar o arquivo interior', detail: 'Margens, fontes, espaçamento entre linhas e imagens conforme as normas do KDP.' },
      { id: 'p4', label: 'Calcular lombada e dimensões da capa', detail: 'Use a aba Lombada nesta página — é essencial para encomendar a capa com medidas corretas.' },
      { id: 'p5', label: 'Criar ou encomendar a capa do livro', detail: 'Mínimo 300 DPI, dimensões exatas conforme o cálculo de lombada. A capa é o principal fator de clique.' },
      { id: 'p6', label: 'Pesquisar palavras-chave KDP', detail: 'Use a aba Keywords nesta página para encontrar termos com boa demanda e baixa concorrência.' },
      { id: 'p7', label: 'Escrever a descrição do livro', detail: 'Use a aba Gerador de Descrição nesta página para criar um rascunho estruturado e otimizado.' },
      { id: 'p8', label: 'Escolher 2 categorias na Amazon', detail: 'Prefira categorias com menor concorrência mas com público relevante para o seu livro.' },
      { id: 'p9', label: 'Definir o preço de venda ideal', detail: 'Use as abas Preço e Royalties nesta página para calcular o valor que equilibra conversão e receita.' },
      { id: 'p10', label: 'Verificar dados bancários no KDP', detail: 'Confirme moeda, país, dados fiscais e método de pagamento para não atrasar seu primeiro pagamento.' },
    ],
  },
  {
    id: 'launch',
    title: 'Semana do lançamento',
    subtitle: 'Publicação, revisão e divulgação',
    items: [
      { id: 'l1', label: 'Fazer upload do arquivo interior no KDP', detail: 'Formatos aceitos: PDF, DOCX ou ePub. O PDF é o mais confiável para livros com formatação específica.' },
      { id: 'l2', label: 'Fazer upload da capa', detail: 'Formato JPEG ou TIFF, mínimo 300 DPI. Verifique se as dimensões batem com o cálculo feito antes.' },
      { id: 'l3', label: 'Conferir o preview do livro no KDP', detail: 'O visualizador do KDP mostra o livro exatamente como o leitor vai ver. Não pule esta etapa.' },
      { id: 'l4', label: 'Preencher todos os metadados', detail: 'Título, subtítulo, descrição formatada em HTML, 7 palavras-chave e as 2 categorias escolhidas.' },
      { id: 'l5', label: 'Definir o preço de lançamento', detail: 'Considere um preço promocional nas primeiras 1 a 2 semanas para acelerar avaliações e ranking.' },
      { id: 'l6', label: 'Publicar e aguardar aprovação', detail: 'O KDP leva entre 24 e 72 horas úteis para revisar e publicar. Acompanhe o status no painel.' },
      { id: 'l7', label: 'Confirmar o livro ao vivo na Amazon', detail: 'Acesse a página do livro: verifique capa, descrição, preço e se o botão de compra está ativo.' },
      { id: 'l8', label: 'Divulgar nas redes sociais', detail: 'Use as artes mensais do Clube para Instagram, Facebook e LinkedIn — conteúdo pronto para postar.' },
    ],
  },
  {
    id: 'post',
    title: 'Pós-lançamento',
    subtitle: 'Visibilidade, dados e próximos passos',
    items: [
      { id: 'po1', label: 'Pedir avaliações a leitores próximos', detail: 'As primeiras avaliações são decisivas para o algoritmo da Amazon. Peça de forma direta e personalizada.' },
      { id: 'po2', label: 'Monitorar o BSR nas primeiras 48 horas', detail: 'O Best Sellers Rank aparece na página do livro. Um BSR baixo indica boa velocidade de vendas.' },
      { id: 'po3', label: 'Criar campanha Amazon Ads (opcional)', detail: 'Anúncios com palavras-chave aumentam a visibilidade orgânica e aceleram as avaliações iniciais.' },
      { id: 'po4', label: 'Publicar conteúdo sobre o livro nas redes', detail: 'Bastidores, citações, reviews de leitores e trechos geram engajamento e novos leitores organicamente.' },
      { id: 'po5', label: 'Analisar dados de vendas após 7 dias', detail: 'No KDP Dashboard veja: unidades vendidas, páginas lidas no Kindle Unlimited e royalties acumulados.' },
      { id: 'po6', label: 'Ajustar descrição ou preço se necessário', detail: 'Faça testes de uma variável por vez e aguarde ao menos 2 semanas para medir o impacto real.' },
      { id: 'po7', label: 'Planejar o próximo lançamento', detail: 'Autores com catálogo vendem mais — cada livro novo aumenta a visibilidade dos anteriores.' },
    ],
  },
]

const TOTAL_ITEMS = PHASES.reduce((acc, p) => acc + p.items.length, 0)

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="#09090f"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LaunchChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<string | null>(null)

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const done = checked.size
  const pct = Math.round((done / TOTAL_ITEMS) * 100)

  return (
    <div className="flex flex-col gap-8">

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-paper-muted text-[10px] tracking-widest uppercase">
            Progresso do lançamento
          </span>
          <span className="font-mono text-gold text-xs font-bold">
            {done} / {TOTAL_ITEMS} etapas
          </span>
        </div>
        <div className="h-1.5 bg-ink-mid rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% concluído`}
          />
        </div>
        {done === TOTAL_ITEMS && done > 0 && (
          <p className="font-serif text-gold text-sm mt-3 text-center">
            ✓ Lançamento completo — parabéns, autor!
          </p>
        )}
      </div>

      {/* Phases */}
      {PHASES.map((phase) => {
        const phaseDone = phase.items.filter((i) => checked.has(i.id)).length
        return (
          <div key={phase.id}>
            <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-gold/10">
              <div>
                <h3 className="font-serif text-paper font-semibold text-base">
                  {phase.title}
                </h3>
                <p className="font-mono text-paper-muted text-[10px] tracking-wide mt-0.5">
                  {phase.subtitle}
                </p>
              </div>
              <span className="font-mono text-gold/60 text-xs flex-shrink-0 ml-4">
                {phaseDone}/{phase.items.length}
              </span>
            </div>

            <ul className="flex flex-col gap-1.5" role="list">
              {phase.items.map((item) => {
                const isChecked = checked.has(item.id)
                const isExpanded = expanded === item.id

                return (
                  <li key={item.id}>
                    <div
                      className={
                        'flex items-start gap-3 px-4 py-3 border cursor-pointer transition-colors duration-150 ' +
                        (isChecked
                          ? 'border-gold/20 bg-gold/5'
                          : 'border-gold/10 bg-ink-mid/30 hover:border-gold/25 hover:bg-ink-mid/60')
                      }
                      onClick={() => toggle(item.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault()
                          toggle(item.id)
                        }
                      }}
                    >
                      {/* Checkbox */}
                      <span
                        className={
                          'flex-shrink-0 w-4 h-4 mt-0.5 border flex items-center justify-center transition-colors duration-150 ' +
                          (isChecked ? 'bg-gold border-gold' : 'border-gold/30 bg-transparent')
                        }
                        aria-hidden="true"
                      >
                        {isChecked && <CheckIcon />}
                      </span>

                      {/* Label */}
                      <p
                        className={
                          'flex-1 font-sans text-sm leading-snug transition-colors duration-150 ' +
                          (isChecked ? 'text-paper-muted line-through' : 'text-paper')
                        }
                      >
                        {item.label}
                      </p>

                      {/* Expand toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpanded(isExpanded ? null : item.id)
                        }}
                        className="font-mono text-gold/40 text-xs flex-shrink-0 hover:text-gold/70 transition-colors duration-150 w-4 text-center"
                        aria-label={isExpanded ? 'Ocultar detalhe' : 'Ver detalhe'}
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>

                    {/* Detail */}
                    {isExpanded && (
                      <div className="px-4 py-2.5 border border-t-0 border-gold/10 bg-ink-mid/20">
                        <p className="font-mono text-paper-muted text-xs leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}

      {/* Reset */}
      {done > 0 && (
        <button
          type="button"
          onClick={() => { setChecked(new Set()); setExpanded(null) }}
          className="font-mono text-paper-muted text-xs hover:text-paper-dim transition-colors duration-150 self-start"
        >
          Reiniciar checklist
        </button>
      )}
    </div>
  )
}
