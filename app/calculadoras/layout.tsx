import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadoras KDP | LIBRIX HUB',
  description:
    'Calcule seus royalties na Amazon KDP e as dimensões exatas de lombada e capa para publicar seu livro.',
}

export default function CalculadorasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
