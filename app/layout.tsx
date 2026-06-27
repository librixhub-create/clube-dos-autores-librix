import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
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

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
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
