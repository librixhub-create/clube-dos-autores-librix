'use client'

import { useState } from 'react'

type GenreType = 'fiction' | 'nonfiction'
type Genre = { value: string; label: string; type: GenreType }
type Tone = { value: string; label: string }

const GENRES: Genre[] = [
  { value: 'romance', label: 'Romance', type: 'fiction' },
  { value: 'thriller', label: 'Thriller / Suspense', type: 'fiction' },
  { value: 'fantasia', label: 'Fantasia / Ficção Científica', type: 'fiction' },
  { value: 'ficcao', label: 'Ficção Literária', type: 'fiction' },
  { value: 'infantil', label: 'Infantil / Juvenil', type: 'fiction' },
  { value: 'autoajuda', label: 'Autoajuda', type: 'nonfiction' },
  { value: 'negocios', label: 'Negócios / Empreendedorismo', type: 'nonfiction' },
  { value: 'biografia', label: 'Biografia / Memórias', type: 'nonfiction' },
]

const TONES: Tone[] = [
  { value: 'emocionante', label: 'Emocionante' },
  { value: 'inspirador', label: 'Inspirador' },
  { value: 'tenso', label: 'Tenso / Intrigante' },
  { value: 'informativo', label: 'Direto / Informativo' },
  { value: 'poetico', label: 'Poético / Sensível' },
]

const HOOKS: Record<string, string[]> = {
  emocionante: [
    'Algumas histórias mudam tudo.',
    'Há momentos que definem quem somos para sempre.',
    'Nem tudo o que parece perdido está realmente perdido.',
  ],
  inspirador: [
    'Toda grande mudança começa com uma escolha.',
    'Há uma força em você esperando para ser descoberta.',
    'O caminho mais difícil costuma ser o mais transformador.',
  ],
  tenso: [
    'Nem tudo é o que parece.',
    'Algumas verdades preferem ficar escondidas.',
    'Quando as respostas chegam, as perguntas ficam maiores.',
  ],
  informativo: [
    'O que separa quem avança de quem trava é o método.',
    'A diferença está nos detalhes que poucos conhecem.',
    'Informação sem aplicação não transforma nada — este livro transforma.',
  ],
  poetico: [
    'Existem histórias que só se revelam quando você para de procurá-las.',
    'Algumas palavras chegam antes da gente estar pronta para ouvi-las.',
    'Há beleza até nas histórias mais difíceis de contar.',
  ],
}

function pickHook(tone: string): string {
  const list = HOOKS[tone] ?? HOOKS['emocionante']
  return list[Math.floor(Math.random() * list.length)]
}

type GeneratedDesc = {
  hook: string
  setup: string
  conflict: string
  resolution: string
  audience: string
  cta: string
}

function buildDescription(
  titulo: string,
  genre: Genre,
  tone: string,
  protagonista: string,
  conflito: string,
  resolucao: string,
  publico: string
): GeneratedDesc {
  const hook = pickHook(tone)

  if (genre.type === 'fiction') {
    return {
      hook,
      setup: `Em "${titulo}", ${protagonista}.`,
      conflict: conflito ? `Mas ${conflito}.` : '',
      resolution: resolucao ? `${resolucao}.` : '',
      audience: publico
        ? `Se você é leitor de ${genre.label.toLowerCase()} que aprecia ${publico}, este livro foi escrito para você.`
        : `Uma leitura que não vai sair da sua cabeça.`,
      cta: `Disponível agora na Amazon KDP.`,
    }
  }

  return {
    hook,
    setup: `Em "${titulo}", você vai descobrir ${protagonista}.`,
    conflict: conflito ? `O grande desafio? ${conflito}.` : '',
    resolution: resolucao ? `${resolucao}.` : '',
    audience: publico
      ? `Este livro é para ${publico} que quer ir além e construir resultados reais.`
      : `Para quem está pronto para dar o próximo passo.`,
    cta: `Disponível agora na Amazon KDP.`,
  }
}

function HighlightTitle({ text, title }: { text: string; title: string }) {
  if (!title.trim() || !text.includes(title)) return <>{text}</>
  const parts = text.split(title)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-paper font-semibold">{title}</span>
          )}
        </span>
      ))}
    </>
  )
}

export default function DescriptionGenerator() {
  const [titulo, setTitulo] = useState('')
  const [genre, setGenre] = useState('')
  const [tone, setTone] = useState('')
  const [protagonista, setProtagonista] = useState('')
  const [conflito, setConflito] = useState('')
  const [resolucao, setResolucao] = useState('')
  const [publico, setPublico] = useState('')
  const [result, setResult] = useState<GeneratedDesc | null>(null)
  const [copied, setCopied] = useState(false)

  const genreObj = GENRES.find((g) => g.value === genre)
  const isFiction = genreObj?.type === 'fiction'
  const canGenerate = titulo.trim() && genre && tone && protagonista.trim() && conflito.trim()

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!canGenerate || !genreObj) return
    setResult(buildDescription(titulo.trim(), genreObj, tone, protagonista.trim(), conflito.trim(), resolucao.trim(), publico.trim()))
  }

  function handleCopy() {
    if (!result) return
    const lines = [result.hook, result.setup, result.conflict, result.resolution, result.audience, result.cta]
      .filter(Boolean)
      .join('\n\n')
    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-7">

      <form onSubmit={handleGenerate} noValidate className="flex flex-col gap-4">

        {/* Título */}
        <div>
          <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
            Título do livro *
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: O Segredo das Marés"
            className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
          />
        </div>

        {/* Gênero + Tom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
              Gênero *
            </label>
            <select
              value={genre}
              onChange={(e) => { setGenre(e.target.value); setResult(null) }}
              className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm focus:outline-none focus:border-gold/60 transition-colors duration-150 appearance-none"
            >
              <option value="" disabled>Selecione o gênero</option>
              <optgroup label="Ficção">
                {GENRES.filter((g) => g.type === 'fiction').map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </optgroup>
              <optgroup label="Não-ficção">
                {GENRES.filter((g) => g.type === 'nonfiction').map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
              Tom da narrativa *
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm focus:outline-none focus:border-gold/60 transition-colors duration-150 appearance-none"
            >
              <option value="" disabled>Selecione o tom</option>
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Protagonista / Tema */}
        <div>
          <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
            {isFiction === false
              ? 'Tema central — o que o livro ensina *'
              : 'Protagonista — quem é e o que quer *'}
          </label>
          <input
            type="text"
            value={protagonista}
            onChange={(e) => setProtagonista(e.target.value)}
            placeholder={
              isFiction === false
                ? 'Ex: como autores independentes podem vender mais com estratégia'
                : 'Ex: uma jovem cientista que quer provar sua teoria ao mundo'
            }
            className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
          />
        </div>

        {/* Conflito */}
        <div>
          <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
            {isFiction === false ? 'Problema que o livro resolve *' : 'Conflito principal *'}
          </label>
          <input
            type="text"
            value={conflito}
            onChange={(e) => setConflito(e.target.value)}
            placeholder={
              isFiction === false
                ? 'Ex: publicar sem visibilidade e sem retorno financeiro'
                : 'Ex: uma conspiração ameaça apagar sua descoberta antes de ser revelada'
            }
            className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
          />
        </div>

        {/* Resolução */}
        <div>
          <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
            {isFiction === false
              ? 'Transformação que o leitor alcança'
              : 'Promessa de resolução (sem spoiler)'}
          </label>
          <input
            type="text"
            value={resolucao}
            onChange={(e) => setResolucao(e.target.value)}
            placeholder={
              isFiction === false
                ? 'Ex: ao final você terá um sistema claro para lançar e vender seus livros'
                : 'Ex: a verdade que ela descobre vai mudar a ciência para sempre'
            }
            className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
          />
        </div>

        {/* Público */}
        <div>
          <label className="font-mono text-paper-muted text-[10px] tracking-widest uppercase block mb-1.5">
            Público-alvo
          </label>
          <input
            type="text"
            value={publico}
            onChange={(e) => setPublico(e.target.value)}
            placeholder={
              isFiction === false
                ? 'Ex: autores independentes que querem viver da escrita'
                : 'Ex: histórias de suspense com protagonistas femininas fortes'
            }
            className="w-full bg-ink border border-gold/25 px-4 py-2.5 font-sans text-paper text-sm placeholder:text-paper-muted focus:outline-none focus:border-gold/60 transition-colors duration-150"
          />
        </div>

        <button
          type="submit"
          disabled={!canGenerate}
          className="w-full bg-gold text-white font-sans font-bold text-sm py-3 rounded hover:bg-gold-light transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Gerar descrição
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="border border-gold/20 bg-ink-mid/40">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gold/10">
            <p className="font-mono text-gold/60 text-[10px] tracking-widest uppercase">
              Descrição gerada · KDP
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="font-mono text-paper-muted text-xs border border-gold/20 px-3 py-1 hover:border-gold/50 hover:text-paper transition-colors duration-150"
            >
              {copied ? '✓ Copiado' : 'Copiar texto'}
            </button>
          </div>

          <div className="px-5 py-5 flex flex-col gap-4">
            {[result.hook, result.setup, result.conflict, result.resolution, result.audience, result.cta]
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="font-sans text-paper-dim text-sm leading-relaxed">
                  <HighlightTitle text={para} title={titulo.trim()} />
                </p>
              ))}
          </div>

          <div className="px-5 pb-4 pt-2 border-t border-gold/10">
            <p className="font-mono text-paper-muted text-[10px] leading-relaxed">
              ✦ Este é um rascunho estruturado. Personalize com detalhes únicos antes de publicar no KDP. Membros do Clube recebem revisão mensal de descrição incluída no plano.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
