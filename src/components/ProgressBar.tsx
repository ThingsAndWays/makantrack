import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  label: string
  consumed: number
  target: number
  unit: string
  indicatorClassName: string
}

export default function ProgressBar({ label, consumed, target, unit, indicatorClassName }: ProgressBarProps) {
  const pct = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0
  const remaining = Math.max(target - consumed, 0)
  const over = consumed > target

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          {Math.round(consumed)} / {target} {unit}
        </span>
      </div>
      <Progress value={pct} indicatorClassName={over ? 'bg-destructive' : indicatorClassName} />
      <div className="text-xs text-muted-foreground mt-1">
        {over ? `${Math.round(consumed - target)} ${unit} over` : `${Math.round(remaining)} ${unit} remaining`}
      </div>
    </div>
  )
}
