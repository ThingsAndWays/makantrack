interface ProgressBarProps {
  label: string
  consumed: number
  target: number
  unit: string
  colorClass: string
}

export default function ProgressBar({ label, consumed, target, unit, colorClass }: ProgressBarProps) {
  const pct = target > 0 ? Math.min(100, Math.round((consumed / target) * 100)) : 0
  const remaining = Math.max(target - consumed, 0)
  const over = consumed > target

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-gray-500 dark:text-gray-400">
          {Math.round(consumed)} / {target} {unit}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${over ? 'bg-red-500' : colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {over ? `${Math.round(consumed - target)} ${unit} over` : `${Math.round(remaining)} ${unit} remaining`}
      </div>
    </div>
  )
}
