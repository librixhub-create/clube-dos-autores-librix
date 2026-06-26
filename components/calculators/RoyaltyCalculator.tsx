'use client'

import { useState } from 'react'
import ResultStamp from './ResultStamp'
import {
  calculateEbookRoyalty,
  calculatePaperbackRoyalty,
  calculateMonthlyEarnings,
  type Currency,
  type RoyaltyTier,
  type PrintType,
} from '@/lib/royalty-calculator'

const DISCLAIMER =
  'Valores estimados com base nas regras da Amazon KDP em 2024–2025. ' +
  'Taxas podem mudar — confirme sempre no painel oficial do KDP antes de publicar.'

const labelCls =
  'block font-mono text-paper-dim text-xs tracking-wider uppercase mb-1.5'
const inputCls =
  'w-full bg-ink border border-gold/25 text-paper font-mono text-sm px-3 py-2 rounded-sm ' +
  'focus:outline-none focus:border-gold/70 placeholder:text-paper-muted'
const selectCls =
  'w-full bg-ink border border-gold/25 text-paper font-sans text-sm px-3 py-2 pr-8 rounded-sm ' +
  'focus:outline-none focus:border-gold/70 appearance-none'

function ToggleGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={
              'flex-1 py-2 px-3 font-sans text-sm font-semibold rounded-sm border transition-colors duration-150 ' +
              (value === opt.value
                ? 'bg-gold text-ink border-gold'
                : 'bg-transparent text-paper-dim border-gold/25 hover:border-gold/50 hover:text-paper')
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default function RoyaltyCalculator() {
  const [format, setFormat] = useState<'ebook' | 'paperback'>('ebook')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState<Currency>('BRL')
  const [royaltyTier, setRoyaltyTier] = useState<RoyaltyTier>('70')
  const [fileSizeMb, setFileSizeMb] = useState('1')
  const [pages, setPages] = useState('')
  const [printType, setPrintType] = useState<PrintType>('bw')
  const [monthlySales, setMonthlySales] = useState('')

  const priceNum = Math.max(0, parseFloat(price) || 0)
  const pagesNum = Math.max(0, parseInt(pages) || 0)
  const fileSizeNum = Math.max(0.1, parseFloat(fileSizeMb) || 1)
  const salesNum = Math.max(0, parseInt(monthlySales) || 0)
  const hasResult = priceNum > 0 && (format === 'ebook' || pagesNum > 0)

  const currSym = currency === 'BRL' ? 'R$' : 'US$'

  function fmt(val: number): string {
    const prefix = val < 0 ? '− ' : ''
    return `${prefix}${currSym} ${Math.abs(val).toFixed(2)}`
  }

  const result = hasResult
    ? format === 'ebook'
      ? calculateEbookRoyalty({ price: priceNum, currency, royaltyTier, fileSizeMb: fileSizeNum })
      : calculatePaperbackRoyalty({ price: priceNum, currency, pages: pagesNum, printType })
    : null

  const monthly =
    result && salesNum > 0
      ? calculateMonthlyEarnings(result.royaltyPerUnit, salesNum)
      : null

  return (
    <div>
      {/* Format */}
      <ToggleGroup
        legend="Formato do livro"
        options={[
          { value: 'ebook', label: 'eBook (Kindle)' },
          { value: 'paperback', label: 'Impresso (Paperback)' },
        ]}
        value={format}
        onChange={(v) => setFormat(v as 'ebook' | 'paperback')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 mb-8">
        {/* Price + currency */}
        <div>
          <label htmlFor="ry-price" className={labelCls}>
            Preço de capa
          </label>
          <div className="flex gap-2">
            <div className="relative flex-shrink-0 w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className={selectCls}
                aria-label="Moeda"
              >
                <option value="BRL">BRL</option>
                <option value="USD">USD</option>
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-paper-muted text-xs" aria-hidden="true">▾</span>
            </div>
            <input
              id="ry-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
              className={inputCls}
            />
          </div>
        </div>

        {/* eBook: royalty tier */}
        {format === 'ebook' && (
          <ToggleGroup
            legend="Faixa de royalty"
            options={[
              { value: '70', label: '70%' },
              { value: '35', label: '35%' },
            ]}
            value={royaltyTier}
            onChange={(v) => setRoyaltyTier(v as RoyaltyTier)}
          />
        )}

        {/* eBook + 70%: file size */}
        {format === 'ebook' && royaltyTier === '70' && (
          <div>
            <label htmlFor="ry-filesize" className={labelCls}>
              Tamanho do arquivo (MB)
            </label>
            <input
              id="ry-filesize"
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
            <label htmlFor="ry-pages" className={labelCls}>
              Número de páginas
            </label>
            <input
              id="ry-pages"
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
          <ToggleGroup
            legend="Tipo de miolo"
            options={[
              { value: 'bw', label: 'Preto e Branco' },
              { value: 'color', label: 'Colorido' },
            ]}
            value={printType}
            onChange={(v) => setPrintType(v as PrintType)}
          />
        )}

        {/* Monthly sales */}
        <div>
          <label htmlFor="ry-sales" className={labelCls}>
            Vendas estimadas / mês
          </label>
          <input
            id="ry-sales"
            type="number"
            min="0"
            step="1"
            value={monthlySales}
            onChange={(e) => setMonthlySales(e.target.value)}
            placeholder="ex: 30"
            className={inputCls}
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <div>
          {result.warning && (
            <div
              role="alert"
              aria-live="polite"
              className="border border-terra/40 bg-terra/10 rounded-sm p-4 mb-6"
            >
              <p className="font-sans text-sm text-terra">{result.warning}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <ResultStamp
              label="Royalty por unidade"
              value={fmt(result.royaltyPerUnit)}
              subtitle={`Taxa efetiva: ${(result.effectiveRate * 100).toFixed(0)}%`}
              negative={result.isNegative}
            />
            {monthly !== null && salesNum > 0 && (
              <ResultStamp
                label={`Ganho com ${salesNum} vendas/mês`}
                value={fmt(monthly)}
                negative={monthly < 0}
              />
            )}
          </div>

          {/* Breakdown */}
          <div className="border border-gold/15 rounded-sm p-5 bg-ink-light">
            <p className="font-mono text-paper-muted text-xs tracking-wider uppercase mb-4">
              Detalhamento
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-sans text-paper-dim">Preço de capa</dt>
                <dd className="font-mono text-paper">{fmt(priceNum)}</dd>
              </div>
              {result.printingCost > 0 && (
                <div className="flex justify-between">
                  <dt className="font-sans text-paper-dim">Custo de impressão (estimado)</dt>
                  <dd className="font-mono text-terra">− {fmt(result.printingCost)}</dd>
                </div>
              )}
              {result.deliveryCost > 0 && (
                <div className="flex justify-between">
                  <dt className="font-sans text-paper-dim">Custo de entrega do arquivo</dt>
                  <dd className="font-mono text-terra">− {fmt(result.deliveryCost)}</dd>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gold/15">
                <dt className="font-sans text-paper font-semibold">Royalty líquido</dt>
                <dd
                  className={
                    'font-mono font-bold ' +
                    (result.isNegative ? 'text-terra' : 'text-gold')
                  }
                >
                  {fmt(result.royaltyPerUnit)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <p className="font-sans text-paper-muted text-xs mt-6 leading-relaxed">
        {DISCLAIMER}
      </p>
    </div>
  )
}
