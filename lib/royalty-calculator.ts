// ============================================================
// Royalty Calculator — Amazon KDP (2024–2025)
// All constants are marked so you can update them when KDP changes rates.
// Source: https://kdp.amazon.com/en_US/help/topic/G201834220
// ============================================================

/** [CONST] USD → BRL conversion rate. Update when needed. */
export const USD_TO_BRL = 5.0

/** [CONST] EUR → USD conversion rate. Update when needed. */
export const EUR_TO_USD = 1.09

/** [CONST] KDP delivery cost per MB of file size (70% plan, USD) */
export const DELIVERY_COST_PER_MB_USD = 0.15

/** [CONST] Price floor (USD) for 70% royalty eligibility */
export const ROYALTY_70_MIN_USD = 2.99

/** [CONST] Price ceiling (USD) for 70% royalty eligibility */
export const ROYALTY_70_MAX_USD = 9.99

/** [CONST] Paperback printing — black & white base cost (USD) */
export const PRINT_BW_FIXED_USD = 0.85

/** [CONST] Paperback printing — black & white cost per page (USD) */
export const PRINT_BW_PER_PAGE_USD = 0.012

/** [CONST] Paperback printing — color base cost (USD) */
export const PRINT_COLOR_FIXED_USD = 0.85

/** [CONST] Paperback printing — color cost per page (USD) */
export const PRINT_COLOR_PER_PAGE_USD = 0.065

/** [CONST] Paperback royalty rate */
export const PAPERBACK_ROYALTY_RATE = 0.60

// ── Types ──────────────────────────────────────────────────

export type Currency = 'USD' | 'BRL' | 'EUR'
export type RoyaltyTier = '35' | '70'
export type PrintType = 'bw' | 'color'

export interface EbookInput {
  price: number
  currency: Currency
  royaltyTier: RoyaltyTier
  /** File size in MB — affects delivery cost on the 70% plan */
  fileSizeMb: number
}

export interface PaperbackInput {
  price: number
  currency: Currency
  pages: number
  printType: PrintType
}

export interface RoyaltyResult {
  royaltyPerUnit: number
  /** Printing cost (paperback only) in the user's currency */
  printingCost: number
  /** Delivery cost (eBook 70% plan only) in the user's currency */
  deliveryCost: number
  currency: Currency
  warning: string | null
  isNegative: boolean
  /** Effective royalty rate applied (0.35, 0.70, or 0.60) */
  effectiveRate: number
}

// ── Helpers ────────────────────────────────────────────────

function toUSD(amount: number, currency: Currency): number {
  if (currency === 'BRL') return amount / USD_TO_BRL
  if (currency === 'EUR') return amount * EUR_TO_USD
  return amount
}

function fromUSD(amount: number, currency: Currency): number {
  if (currency === 'BRL') return amount * USD_TO_BRL
  if (currency === 'EUR') return amount / EUR_TO_USD
  return amount
}

function fmtThreshold(usd: number, currency: Currency): string {
  if (currency === 'BRL') return `R$ ${(usd * USD_TO_BRL).toFixed(2)}`
  if (currency === 'EUR') return `€ ${(usd / EUR_TO_USD).toFixed(2)}`
  return `US$ ${usd.toFixed(2)}`
}

// ── Calculators ────────────────────────────────────────────

export function calculateEbookRoyalty(input: EbookInput): RoyaltyResult {
  const priceUSD = toUSD(input.price, input.currency)

  let effectiveRate = input.royaltyTier === '70' ? 0.70 : 0.35
  let warning: string | null = null

  if (input.royaltyTier === '70') {
    const outOfRange =
      priceUSD < ROYALTY_70_MIN_USD || priceUSD > ROYALTY_70_MAX_USD
    if (outOfRange) {
      effectiveRate = 0.35
      warning =
        `O plano 70% exige preço entre ` +
        `${fmtThreshold(ROYALTY_70_MIN_USD, input.currency)} e ` +
        `${fmtThreshold(ROYALTY_70_MAX_USD, input.currency)}. ` +
        `Calculando com 35%.`
    }
  }

  let deliveryCostUSD = 0
  let royaltyUSD: number

  if (effectiveRate === 0.70) {
    deliveryCostUSD = input.fileSizeMb * DELIVERY_COST_PER_MB_USD
    royaltyUSD = priceUSD * 0.70 - deliveryCostUSD
  } else {
    royaltyUSD = priceUSD * 0.35
  }

  return {
    royaltyPerUnit: fromUSD(royaltyUSD, input.currency),
    printingCost: 0,
    deliveryCost: fromUSD(deliveryCostUSD, input.currency),
    currency: input.currency,
    warning,
    isNegative: royaltyUSD < 0,
    effectiveRate,
  }
}

export function calculatePaperbackRoyalty(input: PaperbackInput): RoyaltyResult {
  const priceUSD = toUSD(input.price, input.currency)

  const fixed =
    input.printType === 'bw' ? PRINT_BW_FIXED_USD : PRINT_COLOR_FIXED_USD
  const perPage =
    input.printType === 'bw' ? PRINT_BW_PER_PAGE_USD : PRINT_COLOR_PER_PAGE_USD
  const printingCostUSD = fixed + perPage * input.pages

  const royaltyUSD = priceUSD * PAPERBACK_ROYALTY_RATE - printingCostUSD
  const isNegative = royaltyUSD < 0

  return {
    royaltyPerUnit: fromUSD(royaltyUSD, input.currency),
    printingCost: fromUSD(printingCostUSD, input.currency),
    deliveryCost: 0,
    currency: input.currency,
    warning: isNegative
      ? 'Com esse preço, você teria prejuízo por unidade vendida — aumente o preço de capa.'
      : null,
    isNegative,
    effectiveRate: PAPERBACK_ROYALTY_RATE,
  }
}

export function calculateMonthlyEarnings(
  royaltyPerUnit: number,
  monthlySales: number
): number {
  return royaltyPerUnit * monthlySales
}
