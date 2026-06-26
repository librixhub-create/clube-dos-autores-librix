import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LIBRIX ACADEMY | Academia do Autor',
  description:
    'Escrever é arte. Publicar é estratégia. A academia mensal para autores independentes que publicam na Amazon KDP. Templates, checklists, revisões e consultoria personalizada por €49/mês.',
  openGraph: {
    title: 'LIBRIX ACADEMY | Academia do Autor',
    description:
      'Escrever é arte. Publicar é estratégia. A academia para autores independentes que publicam na Amazon KDP.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LIBRIX ACADEMY — Academia do Autor',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink text-paper font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
