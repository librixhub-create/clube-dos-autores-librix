import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ferramentas para Autores | LIBRIX ACADEMY',
  description:
    'Calculadoras de royalties e lombada KDP, e conversor de Word ↔ PDF — tudo no navegador, sem enviar arquivos a servidores.',
}

export default function CalculadorasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
