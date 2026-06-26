// ============================================================
// Spine Width Calculator — Amazon KDP (2024–2025)
// Source: https://kdp.amazon.com/en_US/help/topic/G201834190
// Update constants below if KDP changes its specs.
// ============================================================

// ── Types ──────────────────────────────────────────────────

export type PaperType = 'white' | 'cream' | 'color'
export type BookSize = '5x8' | '5.5x8.5' | '6x9' | '8.5x11'

export interface SpineInput {
  pages: number
  paperType: PaperType
  bookSize: BookSize
}

export interface SpineResult {
  spineWidthInches: number
  spineWidthMm: number
  coverWidthInches: number
  coverHeightInches: number
  coverWidthMm: number
  coverHeightMm: number
  coverWidthPx: number
  coverHeightPx: number
  warning: string | null
}

// ── Constants ──────────────────────────────────────────────

/** [CONST] Spine width per page by paper type (inches per page) */
export const SPINE_FACTOR: Record<PaperType, number> = {
  white: 0.002252,
  cream: 0.002500,
  color: 0.002347,
}

/** [CONST] Below this page count, KDP does not support spine text */
export const MIN_PAGES_FOR_SPINE = 24

/** [CONST] Recommended minimum for a readable text spine */
export const MIN_PAGES_FOR_READABLE_TEXT = 130

/** [CONST] Standard bleed margin per edge (inches) */
export const BLEED_INCHES = 0.125

/** [CONST] Print DPI for pixel calculations */
export const PRINT_DPI = 300

/** [CONST] Trim dimensions [width, height] in inches per book size */
export const BOOK_DIMENSIONS: Record<BookSize, [number, number]> = {
  '5x8':     [5, 8],
  '5.5x8.5': [5.5, 8.5],
  '6x9':     [6, 9],
  '8.5x11':  [8.5, 11],
}

// ── Calculator ─────────────────────────────────────────────

export function calculateSpine(input: SpineInput): SpineResult {
  const spineIn = input.pages * SPINE_FACTOR[input.paperType]
  const spineMm = spineIn * 25.4

  const [pageW, pageH] = BOOK_DIMENSIONS[input.bookSize]
  // Full flat cover = back + spine + front + bleed on each outer edge
  const coverW = pageW * 2 + spineIn + BLEED_INCHES * 2
  const coverH = pageH + BLEED_INCHES * 2

  let warning: string | null = null
  if (input.pages < MIN_PAGES_FOR_SPINE) {
    warning =
      `Livros com menos de ${MIN_PAGES_FOR_SPINE} páginas geralmente não ` +
      `suportam lombada impressa. O KDP recomenda capa wrap simples sem texto na lombada.`
  } else if (input.pages < MIN_PAGES_FOR_READABLE_TEXT) {
    warning =
      `Com menos de ${MIN_PAGES_FOR_READABLE_TEXT} páginas, a lombada pode ` +
      `ser estreita demais para o título aparecer legível.`
  }

  const r4 = (n: number) => Math.round(n * 10000) / 10000
  const r2 = (n: number) => Math.round(n * 100) / 100

  return {
    spineWidthInches: r4(spineIn),
    spineWidthMm: r2(spineMm),
    coverWidthInches: r4(coverW),
    coverHeightInches: r4(coverH),
    coverWidthMm: r2(coverW * 25.4),
    coverHeightMm: r2(coverH * 25.4),
    coverWidthPx: Math.round(coverW * PRINT_DPI),
    coverHeightPx: Math.round(coverH * PRINT_DPI),
    warning,
  }
}
