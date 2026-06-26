'use client'

import { useState } from 'react'
import ResultStamp from './ResultStamp'
import {
  USD_TO_BRL,
  EUR_TO_USD,
  ROYALTY_70_MIN_USD,
  ROYALTY_70_MAX_USD,
  DELIVERY_COST_PER_MB_USD,
  PRINT_BW_FIXED_USD,
  PRINT_BW_PER_PAGE_USD,
  PRINT_COLOR_FIXED_USD,
  PRINT_COLOR_PER_PAGE_USD,
  type Currency,
} from '@/lib/royalty-calculator'

const labelCls =
  'block font-mono text-paper-dim text-xs tracking-wider uppercase mb-1.5'
const inputCls =
  'w-full bg-ink border border-gold/25 text-paper font-mono text-sm px-3 py-2 rounded-sm ' +
  'focus:outline-none focus:border-gold/70 placeholder:text-paper-muted'
const selectCls =
  'w-full bg-ink border border-gold/25 text-paper font-sans text-sm px-3 py-2 pr-8 rounded-sm ' +
  'focus:outline-none focus:border-gold/70 appearance-none'

function toUSD(n: number, c: Currency) {
  if (c === 'BRL') return n / USD_TO_BRL
  if (c === 'EUR') return n * EUR_TO_USD
  return n
}
function fromUSD(n: number, c: Currency) {
  if (c === 'BRL') return n * USD_TO_BRL
  if (c === 'EUR') return n / EUR_TO_USD
  return n
}
function fmt(n: number, c: Currency) {
  const sym = c === 'BRL' ? 'R$ ' : c === 'EUR' ? '€ ' : 'US$ '
  return `${sym}${Math.abs(n).toFixed(2)}`
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        'flex-1 py-2 px-3 font-sans text-sm font-semibold rounded-sm border transition-colors duration-150 ' +
        (active
          ? 'bg-gold text-ink border-gold'
          : 'bg-transparent text-paper-dim border-gold/25 hover:border-gold/50 hover:text-paper')
      }
    >
      {children}
    </button>
  )
}

export default function PriceCalculator() {
  const [format, setFormat] = useState<'ebook' | 'paperback'>('ebook')
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [tier, setTier] = useState<'70' | '35'>('70')
  const [income, setIncome] = useState('')
  const [sales, setSales] = useState('')
  const [pages, setPages] = useState('')
  const [printType, setPrintType] = useState<'bw' | 'color'>('bw')
  const [fileSizeMb, setFileSizeMb] = useState('1')

  const incomeNum = Math.max(0, parseFloat(income) || 0)
  const salesNum = Math.max(1, parseInt(sales) || 1)
  const pagesNum = Math.max(0, parseInt(pages) || 0)
  const fileSizeNum = Math.max(0.1, parseFloat(fileSizeMb) || 1)
  const hasResult = incomeNum > 0 && (format === 'ebook' || pagesNum > 0)

  function calculate() {
    if (!hasResult) return null

    const targetPerUnitUSD = toUSD(incomeNum / salesNum, currency)

    if (format === 'ebook') {
      const rate = tier === '70' ? 0.7 : 0.35
      const deliveryUSD = tier === '70' ? fileSizeNum * DELIVERY_COST_PER_MB_USD : 0
      // price × rate − delivery = royalty  →  price = (royalty + delivery) / rate
      let priceUSD = (targetPerUnitUSD + deliveryUSD) / rate
      let warning: string | null = null

      if (tier === '70') {
        if (priceUSD < ROYALTY_70_MIN_USD) {
          priceUSD = ROYALTY_70_MIN_USD
          warning = `Preço mínimo para o plano 70%: ${fmt(fromUSD(ROYALTY_70_MIN_USD, currency), currency)}. Valor ajustado automaticamente.`
        } else if (priceUSD > ROYALTY_70_MAX_USD) {
          priceUSD = ROYALTY_70_MAX_USD
          warning = `Preço máximo do plano 70% é ${fmt(fromUSD(ROYALTY_70_MAX_USD, currency), currency)}. Considere o plano 35% para metas maiores.`
        }
      }

      const royaltyUSD = priceUSD * rate - deliveryUSD
      return {
        price: fromUSD(priceUSD, currency),
        royaltyPerUnit: fromUSD(royaltyUSD, currency),
        monthlyIncome: fromUSD(royaltyUSD, currency) * salesNum,
        warning,
      }
    } else {
      const fixed = printType === 'bw' ? PRINT_BW_FIXED_USD : PRINT_COLOR_FIXED_USD
      const perPage = printType === 'bw' ? PRINT_BW_PER_PAGE_USD : PRINT_COLOR_PER_PAGE_USD
      const printCostUSD = fixed + perPage * pagesNum
      // price × 0.60 − printing = royalty  →  price = (royalty + printing) / 0.60
      const priceUSD = (targetPerUnitUSD + printCostUSD) / 0.6
      const royaltyUSD = priceUSD * 0.6 - printCostUSD
      return {
        price: fromUSD(priceUSD, currency),
        royaltyPerUnit: fromUSD(royaltyUSD, currency),
        monthlyIncome: fromUSD(royaltyUSD, currency) * salesNum,
        warning: null,
      }
    }
  }

  const result = calculate()
  const sym = currency === 'BRL' ? 'R$' : currency === 'EUR' ? '€' : 'US$'

  return (
    <div>
      {/* Format */}
      <fieldset className="mb-6">
        <legend className={labelCls}>Formato</legend>
        <div className="flex gap-2">
          <ToggleBtn active={format === 'ebook'} onClick={() => setFormat('ebook')}>
            eBook (Kindle)
          </ToggleBtn>
          <ToggleBtn active={format === 'paperback'} onClick={() => setFormat('paperback')}>
            Impresso
          </ToggleBtn>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {/* Currency */}
        <div>
          <label htmlFor="pc-cur" className={labelCls}>
            Moeda
          </label>
          <div className="relative">
            <select
              id="pc-cur"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className={selectCls}
            >
              <option value="EUR">EUR — Euro</option>
              <option value="BRL">BRL — Real</option>
              <option value="USD">USD — Dólar</option>
            </select>
            <span
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-paper-muted text-xs"
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </div>

        {/* Target income */}
        <div>
          <label htmlFor="pc-income" className={labelCls}>
            Renda mensal desejada ({sym})
          </label>
          <input
            id="pc-income"
            type="number"
            min="0"
            step="1"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="ex: 500"
            className={inputCls}
          />
        </div>

        {/* Monthly sales */}
        <div>
          <label htmlFor="pc-sales" className={labelCls}>
            Vendas estimadas / mês
          </label>
          <input
            id="pc-sales"
            type="number"
            min="1"
            step="1"
            value={sales}
            onChange={(e) => setSales(e.target.value)}
            placeholder="ex: 30"
            className={inputCls}
          />
        </div>

        {/* eBook: royalty tier */}
        {format === 'ebook' && (
          <fieldset>
            <legend className={labelCls}>Faixa de royalty</legend>
            <div className="flex gap-2">
              <ToggleBtn active={tier === '70'} onClick={() => setTier('70')}>
                70%
              </ToggleBtn>
              <ToggleBtn active={tier === '35'} onClick={() => setTier('35')}>
                35%
              </ToggleBtn>
            </div>
          </fieldset>
        )}

        {/* eBook 70%: file size */}
        {format === 'ebook' && tier === '70' && (
          <div>
            <label htmlFor="pc-size" className={labelCls}>
              Tamanho do arquivo (MB)
            </label>
            <input
              id="pc-size"
              type="number"
              min="0.1"
              max="650"
              step="0.1"
              value={fileSizeMb}
              onChange={(e) => setFileSizeMb(e.target.value)}
              className={inputCls}
            />
          </div>
        )}

        {/* Paperback: pages */}
        {format === 'paperback' && (
          <div>
            <label htmlFor="pc-pages" className={labelCls}>
              Número de páginas
            </label>
            <input
              id="pc-pages"
              type="number"
              min="1"
              step="1"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="ex: 200"
              className={inputCls}
            />
          </div>
        )}

        {/* Paperback: print type */}
        {format === 'paperback' && (
          <fieldset>
            <legend className={labelCls}>Tipo de miolo</legend>
            <div className="flex gap-2">
              <ToggleBtn active={printType === 'bw'} onClick={() => setPrintType('bw')}>
                Preto e Branco
              </ToggleBtn>
              <ToggleBtn active={printType === 'color'} onClick={() => setPrintType('color')}>
                Colorido
              </ToggleBtn>
            </div>
          </fieldset>
        )}
      </div>

      {/* Results */}
      {result && (
        <div>
          {result.warning && (
            <div
              role="alert"
              className="border border-terra/40 bg-terra/10 rounded-sm p-4 mb-6"
            >
              <p className="font-sans text-sm text-terra">{result.warning}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <ResultStamp
              label="Preço mínimo recomendado"
              value={fmt(result.price, currency)}
              subtitle={`Royalty por unidade: ${fmt(result.royaltyPerUnit, currency)}`}
            />
            <ResultStamp
              label={`Com ${salesNum} venda${salesNum !== 1 ? 's' : ''}/mês você ganha`}
              value={fmt(result.monthlyIncome, currency)}
              subtitle={
                result.monthlyIncome >= incomeNum
                  ? '✓ Meta atingida'
                  : `Meta: ${fmt(incomeNum, currency)}/mês`
              }
              negative={result.monthlyIncome < 0}
            />
          </div>
        </div>
      )}

      <p className="font-sans text-paper-muted text-xs mt-6 leading-relaxed">
        Cálculo baseado nas taxas Amazon KDP de 2024–2025 com conversão de referência.
        Confirme sempre no painel oficial do KDP antes de publicar.
      </p>
    </div>
  )
}
