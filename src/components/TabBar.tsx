export type Tab = 'dashboard' | 'log' | 'settings'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'log', label: 'Log Food', icon: '🍽️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

interface TabBarProps {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex sm:static sm:border-t-0 sm:border-b sm:mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2.5 sm:py-3 text-sm font-medium border-b-2 transition-colors ${
            active === tab.id
              ? 'text-emerald-600 border-emerald-600'
              : 'text-gray-500 dark:text-gray-400 border-transparent'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
