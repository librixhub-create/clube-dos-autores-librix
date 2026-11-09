'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Eventos do Meta Pixel (o código base está no layout):
 * - ViewContent do Plano Completo quando a oferta aparece na tela (uma vez);
 * - Lead em qualquer clique para o WhatsApp (valor 749 EUR quando é o Plano Completo).
 */
export default function PixelEvents() {
  useEffect(() => {
    const track = (...args: unknown[]) => {
      try {
        window.fbq?.(...args)
      } catch {
        /* pixel bloqueado: ignora */
      }
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href*="wa.me"]')
      if (!a) return
      const href = decodeURIComponent((a as HTMLAnchorElement).href)
      if (href.includes('Plano Completo')) {
        track('track', 'Lead', {
          content_name: 'Plano Completo',
          value: 749,
          currency: 'EUR',
        })
      } else {
        track('track', 'Contact')
      }
    }
    document.addEventListener('click', onClick)

    let observer: IntersectionObserver | undefined
    const offer = document.getElementById('plano-completo')
    if (offer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((en) => en.isIntersecting)) {
            track('track', 'ViewContent', {
              content_name: 'Plano Completo',
              value: 749,
              currency: 'EUR',
            })
            observer?.disconnect()
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(offer)
    }

    return () => {
      document.removeEventListener('click', onClick)
      observer?.disconnect()
    }
  }, [])

  return null
}
