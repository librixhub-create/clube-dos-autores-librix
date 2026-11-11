const VIDEOS = [
  { file: 'luciane-medina', name: 'Luciane Medina', role: 'Autora de Kia ora Beija-flor · Nova Zelândia' },
  { file: 'joao-simao', name: 'João Simão', role: 'Autor · brasileiro em Portugal' },
  { file: 'mano-patrick', name: 'Mano Patrick', role: 'Autor de Amor em Ação' },
  { file: 'marcelo-gomes-ribeiro', name: 'Marcelo Gomes Ribeiro', role: 'Autor de O Pequeno Charley' },
  { file: 'graciela', name: 'Graciela', role: 'Autora de O Código da Pele Negra' },
  { file: 'graciela-livro-impresso', name: 'Graciela', role: 'Livro impresso · O Código da Pele Negra' },
  { file: 'edjane-farias', name: 'Edjane Farias', role: 'Autora de Minhas ovelhas queridas' },
  { file: 'cliente-livro-impresso', name: 'Cliente Librix', role: 'Cliente que imprimiu o livro' },
  { file: 'gloria-silvia-imprensa', name: 'Glória Sílvia', role: 'Autora de Recomeçar · na imprensa' },
]

const PROOFS = [
  {
    src: '/depoimentos/mensagem-luciane.jpg',
    name: 'Luciane Medina',
    caption: 'Mensagem da autora após a publicação',
    alt: 'Mensagem de agradecimento da autora Luciane Medina à Librix Hub',
  },
  {
    src: '/depoimentos/governe-se-europress.jpg',
    name: 'Dayane Samara',
    caption: 'Edição, impressão e publicação na Amazon',
    alt: 'Livro Governe-se impresso pela gráfica Europress e publicado na Amazon',
  },
  {
    src: '/depoimentos/livros-publicados-amazon.jpg',
    name: 'Librix Hub',
    caption: 'Publicações em Kindle e capa comum',
    alt: 'Três livros publicados pela Librix Hub na Amazon, em português e francês',
  },
]

export default function VideoTestimonials() {
  return (
    <section
      id="depoimentos"
      className="py-24 px-4 sm:px-6 scroll-mt-24"
      aria-labelledby="video-testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-14">
          <p className="font-mono text-gold/60 text-xs tracking-widest uppercase mb-3">
            Quem publicou com a Librix
          </p>
          <h2
            id="video-testimonials-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-paper"
          >
            Autores reais contam como foi
          </h2>
        </header>

        <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {VIDEOS.map((v) => (
            <li key={v.file} className="border border-gold/15 rounded-sm p-2 bg-ink-light flex flex-col gap-2">
              <video
                src={`/depoimentos/${v.file}.mp4`}
                poster={`/depoimentos/${v.file}.jpg`}
                controls
                playsInline
                preload="none"
                className="aspect-[9/16] w-full bg-black object-cover rounded-sm"
              >
                Seu navegador não reproduz vídeos.
              </video>
              <div className="px-1 pb-1">
                <p className="font-sans text-paper text-sm font-semibold leading-tight">{v.name}</p>
                <p className="font-mono text-paper-muted text-xs mt-0.5">{v.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul role="list" className="grid gap-4 sm:grid-cols-3 mt-10">
          {PROOFS.map((p) => (
            <li key={p.src} className="border border-gold/15 rounded-sm p-2 bg-ink-light flex flex-col gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover object-top rounded-sm bg-ink-mid"
              />
              <div className="px-1 pb-1">
                <p className="font-sans text-paper text-sm font-semibold leading-tight">{p.name}</p>
                <p className="font-mono text-paper-muted text-xs mt-0.5">{p.caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
