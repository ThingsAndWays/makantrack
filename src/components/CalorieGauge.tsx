interface CalorieGaugeProps {
  consumed: number
  target: number
}

const SIZE = 240
const STROKE = 18
const RADIUS = (SIZE - STROKE) / 2
const CX = SIZE / 2
const CY = SIZE / 2 + 4
const TICK_ANGLES = [-90, -45, 0, 45, 90]

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
}

// angleStart must be <= angleEnd; sweeps clockwise (left -> top -> right) to match
// the polarToCartesian convention where -90deg=left, 0deg=top, 90deg=right.
function describeArc(cx: number, cy: number, r: number, angleStart: number, angleEnd: number) {
  const start = polarToCartesian(cx, cy, r, angleStart)
  const end = polarToCartesian(cx, cy, r, angleEnd)
  const largeArcFlag = angleEnd - angleStart > 180 ? '1' : '0'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

export default function CalorieGauge({ consumed, target }: CalorieGaugeProps) {
  const pct = target > 0 ? Math.min(consumed / target, 1) : 0
  const over = consumed > target
  const remaining = Math.max(target - consumed, 0)

  const trackPath = describeArc(CX, CY, RADIUS, -90, 90)
  const fillPath = describeArc(CX, CY, RADIUS, -90, -90 + pct * 180)
  const gradientId = over ? 'gauge-gradient-over' : 'gauge-gradient-ok'

  const svgHeight = SIZE / 2 + STROKE / 2 + 6

  return (
    <div className="flex flex-col items-center">
      <svg width={SIZE} height={svgHeight} viewBox={`0 0 ${SIZE} ${svgHeight}`}>
        <defs>
          <linearGradient id="gauge-gradient-ok" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--primary), white 35%)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <linearGradient id="gauge-gradient-over" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--destructive), white 25%)" />
            <stop offset="100%" stopColor="var(--destructive)" />
          </linearGradient>
          <filter id="gauge-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor={over ? 'var(--destructive)' : 'var(--primary)'} floodOpacity="0.35" />
          </filter>
        </defs>

        <path d={trackPath} fill="none" className="stroke-muted" strokeWidth={STROKE} strokeLinecap="round" />

        {TICK_ANGLES.map((angle) => {
          const inner = polarToCartesian(CX, CY, RADIUS - STROKE / 2 - 5, angle)
          const outer = polarToCartesian(CX, CY, RADIUS - STROKE / 2 - 1, angle)
          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              className="stroke-muted-foreground/30"
              strokeWidth={2}
              strokeLinecap="round"
            />
          )
        })}

        {pct > 0 && (
          <path
            d={fillPath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            filter="url(#gauge-glow)"
          />
        )}
      </svg>
      <div className="flex flex-col items-center -mt-3">
        <span className="text-4xl font-bold text-foreground tabular-nums">{Math.round(consumed)}</span>
        <span className="text-sm text-muted-foreground">of {target} kcal</span>
        <span
          className={`mt-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            over ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
          }`}
        >
          {over ? `${Math.round(consumed - target)} kcal over` : `${Math.round(remaining)} kcal remaining`}
        </span>
      </div>
    </div>
  )
}
