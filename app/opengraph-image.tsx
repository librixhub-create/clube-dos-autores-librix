import { ImageResponse } from 'next/og'

export const alt = 'LIBRIX ACADEMY — Plano Completo para autores por 749 €'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

// Imagem de compartilhamento (WhatsApp, Facebook, Instagram, LinkedIn).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px',
          background: '#0d1a13',
          color: '#f3eedd',
          border: '10px solid #c9a24b',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: '#c9a24b' }}>
          LIBRIX ACADEMY
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          Plano Completo
        </div>
        <div style={{ fontSize: 36, marginTop: 20, color: '#c8bfa8' }}>
          Edição, tradução, publicação global, audiobook, site e marketing.
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 36, color: '#c9a24b' }}>
          749 €
        </div>
      </div>
    ),
    size
  )
}
