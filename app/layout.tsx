import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import PixelEvents from '@/components/PixelEvents'
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

const SITE_URL = 'https://www.librixacademy.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'LIBRIX ACADEMY | Plano Completo para Autores: Publicação, Tradução e Site',
  description:
    'Plano Completo por 749 €: edição, tradução para inglês, publicação global (Kindle, paperback e capa dura), audiobook, site do autor e consultoria de marketing. Publique. Apareça. Venda.',
  keywords: [
    'publicar livro Amazon KDP',
    'plano completo para autores',
    'tradução de livro para inglês',
    'audiobook',
    'site para autores',
    'diagramação e capa',
    'autores independentes',
    'publicação de livros Portugal',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'LIBRIX ACADEMY | Plano Completo para Autores por 749 €',
    description:
      'Edição, tradução, publicação global, audiobook, site do autor e consultoria de marketing num só plano.',
    type: 'website',
    url: SITE_URL,
    siteName: 'LIBRIX ACADEMY',
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIBRIX ACADEMY | Plano Completo para Autores por 749 €',
    description:
      'Do manuscrito ao livro à venda no mundo inteiro, num só plano.',
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'LIBRIX ACADEMY',
      url: SITE_URL,
      email: 'librixhub@gmail.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+55-32-99849-1620',
        availableLanguage: ['Portuguese', 'English', 'Spanish'],
      },
    },
    {
      '@type': 'Service',
      name: 'Plano Completo Librix',
      serviceType: 'Publicação de livros',
      description:
        'Edição profissional, tradução para o inglês, publicação global (Kindle, paperback e capa dura), audiobook, site do autor e consultoria de marketing.',
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: 'Europe',
      offers: {
        '@type': 'Offer',
        price: '749',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/#plano-completo`,
      },
    },
  ],
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

        <WhatsAppFloat />
        <PixelEvents />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        {/* Facebook Pixel (carrega depois de a página ficar interativa, sem atrasar o LCP) */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','854543982936212');
            fbq('track','PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=854543982936212&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
