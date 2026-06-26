'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import RoyaltyCalculator from '@/components/calculators/RoyaltyCalculator'
import SpineCalculator from '@/components/calculators/SpineCalculator'
import FileConverter from '@/components/calculators/FileConverter'

type Tab = 'royalties' | 'lombada' | 'conversor'

const TABS: { id: Tab; label: string; description: string }[] = [
  {
    id: 'royalties',
    label: 'Royalties',
    description: 'Quanto você recebe por venda na Amazon',
  },
  {
    id: 'lombada',
    label: 'Lombada',
    description: 'Largura da lombada e dimensões da capa plana',
  },
  {
    id: 'conversor',
    label: 'Conversor',
    description: 'Converta arquivos Word ↔ PDF direto no navegador',
  },
]

export default function CalculadorasPage() {
  const [activeTab, setActiveTab] = useState<Tab>('royalties')

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto py-12 sm:py-16">
          {/* Header */}
          <header className="mb-10">
            <p className="font-mono text-gold/70 text-xs tracking-widest uppercase mb-3">
              Ferramentas gratuitas · LIBRIX HUB
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-paper mb-3">
              Ferramentas para Autores
            </h1>
            <p className="font-sans text-paper-dim text-base sm:text-lg max-w-lg">
              Calcule royalties e lombada KDP, converta arquivos Word ↔ PDF — tudo
              no navegador, sem enviar dados a servidores.
            </p>
          </header>

          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Selecione a ferramenta"
            className="flex gap-0 border-b border-gold/20 mb-10"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  'px-4 sm:px-5 py-3 border-b-2 -mb-px font-serif text-sm sm:text-base font-semibold transition-colors duration-150 text-left ' +
                  (activeTab === tab.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-paper-dim hover:text-paper')
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active tab description */}
          <p className="font-sans text-paper-dim text-sm mb-8 -mt-6">
            {TABS.find((t) => t.id === activeTab)?.description}
          </p>

          {/* Panels */}
          <div
            id="panel-royalties"
            role="tabpanel"
            aria-labelledby="tab-royalties"
            hidden={activeTab !== 'royalties'}
          >
            <RoyaltyCalculator />
          </div>

          <div
            id="panel-lombada"
            role="tabpanel"
            aria-labelledby="tab-lombada"
            hidden={activeTab !== 'lombada'}
          >
            <SpineCalculator />
          </div>

          <div
            id="panel-conversor"
            role="tabpanel"
            aria-labelledby="tab-conversor"
            hidden={activeTab !== 'conversor'}
          >
            <FileConverter />
          </div>
        </div>
      </main>
    </>
  )
}
