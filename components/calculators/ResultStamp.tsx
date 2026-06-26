// All class strings are complete so Tailwind JIT detects them statically.
const goldStyles = {
  outer: 'border-2 border-gold p-1',
  inner: 'border border-gold/35 p-5 text-center bg-ink-deep relative',
  tl: 'absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-gold/30',
  tr: 'absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-gold/30',
  bl: 'absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-gold/30',
  br: 'absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-gold/30',
  value: 'font-mono font-bold text-3xl sm:text-4xl text-gold leading-tight',
}

const terraStyles = {
  outer: 'border-2 border-terra p-1',
  inner: 'border border-terra/35 p-5 text-center bg-ink-deep relative',
  tl: 'absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-terra/30',
  tr: 'absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-terra/30',
  bl: 'absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-terra/30',
  br: 'absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-terra/30',
  value: 'font-mono font-bold text-3xl sm:text-4xl text-terra leading-tight',
}

interface ResultStampProps {
  label: string
  value: string
  subtitle?: string
  negative?: boolean
}

export default function ResultStamp({
  label,
  value,
  subtitle,
  negative = false,
}: ResultStampProps) {
  const s = negative ? terraStyles : goldStyles

  return (
    <div className={s.outer}>
      <div className={s.inner}>
        <div className={s.tl} aria-hidden="true" />
        <div className={s.tr} aria-hidden="true" />
        <div className={s.bl} aria-hidden="true" />
        <div className={s.br} aria-hidden="true" />
        <p className="font-mono text-paper-muted text-xs tracking-widest uppercase mb-2">
          {label}
        </p>
        <p className={s.value}>{value}</p>
        {subtitle && (
          <p className="font-sans text-paper-dim text-sm mt-1.5">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
