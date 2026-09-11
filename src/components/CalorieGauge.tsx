interface CalorieGaugeProps {
  consumed: number
  target: number
}

const SIZE = 220
const STROKE = 20
const RADIUS = (SIZE - STROKE) / 2
const CX = SIZE / 2
const CY = SIZE / 2 + 4

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

  return (
    <div className="flex flex-col items-center">
      <svg width={SIZE} height={SIZE / 2 + STROKE / 2 + 8} viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE / 2 + 8}`}>
        <path
          d={trackPath}
          fill="none"
          className="stroke-muted"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        {pct > 0 && (
          <path
            d={fillPath}
            fill="none"
            className={over ? 'stroke-destructive' : 'stroke-primary'}
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
        )}
        {/* needle tip marking the empty (E) and full (F) ends, fuel-gauge style */}
        <text x={CX - RADIUS} y={CY + 18} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          E
        </text>
        <text x={CX + RADIUS} y={CY + 18} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          F
        </text>
      </svg>
      <div className="flex flex-col items-center -mt-2">
        <span className="text-4xl font-bold text-foreground tabular-nums">{Math.round(consumed)}</span>
        <span className="text-sm text-muted-foreground">of {target} kcal</span>
        <span className={`text-xs font-medium mt-1 ${over ? 'text-destructive' : 'text-primary'}`}>
          {over ? `${Math.round(consumed - target)} kcal over` : `${Math.round(remaining)} kcal remaining`}
        </span>
      </div>
    </div>
  )
}
