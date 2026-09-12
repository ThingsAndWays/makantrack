import { LayoutDashboard, Settings2, UtensilsCrossed } from 'lucide-react'

export type Tab = 'dashboard' | 'log' | 'settings'

const TABS: { id: Tab; label: string; Icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'log', label: 'Log Food', Icon: UtensilsCrossed },
  { id: 'settings', label: 'Settings', Icon: Settings2 },
]

interface TabBarProps {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border flex sm:static sm:border-t-0 sm:border-b sm:mb-6 sm:bg-background">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors"
          >
            <span
              className={`flex items-center justify-center rounded-full px-3 py-1 sm:px-2.5 sm:py-1 transition-colors ${
                isActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="size-5 sm:size-4" strokeWidth={isActive ? 2.5 : 2} />
            </span>
            <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
