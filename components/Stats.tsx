'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 45, suffix: '+', label: 'Autores no Clube', note: 'e crescendo todo mês' },
  { value: 120, suffix: '+', label: 'Livros publicados', note: 'com apoio da Academy' },
  { value: 4.9, suffix: '★', label: 'Avaliação média', note: 'pelos membros ativos', decimal: true },
  { value: 49, prefix: '€', label: 'Por mês, tudo incluído', note: 'sem surpresas, sem taxa extra' },
]

function Counter({
  value,
  suffix = '',
  prefix = '',
  decimal = false,
}: {
  value: number
  suffix?: string
  prefix?: string
  decimal?: boolean
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const steps = 40
        const duration = 1100
        const interval = duration / steps
        const increment = value / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= value) {
            setCount(value)
            clearInterval(timer)
          } else {
            setCount(decimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
          }
        }, interval)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, decimal])

  const display = decimal ? count.toFixed(1) : count

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      className="py-14 px-4 sm:px-6 border-y border-gold/10"
      aria-label="Números da LIBRIX ACADEMY"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <p className="font-mono text-gold font-bold text-3xl sm:text-4xl leading-none tracking-tight">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  decimal={s.decimal}
                />
              </p>
              <p className="font-serif text-paper text-sm font-semibold mt-3 leading-snug">
                {s.label}
              </p>
              <p className="font-mono text-paper-muted text-[10px] tracking-wide mt-1">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
