import type { LogEntry, Preferences, Targets, UserProfile } from '../types'

const KEYS = {
  profile: 'makantrack:profile',
  targets: 'makantrack:targets',
  logs: 'makantrack:logs',
  preferences: 'makantrack:preferences',
} as const

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getProfile(): UserProfile | null {
  return read<UserProfile>(KEYS.profile)
}

export function saveProfile(profile: UserProfile): void {
  write(KEYS.profile, profile)
}

export function getTargets(): Targets | null {
  return read<Targets>(KEYS.targets)
}

export function saveTargets(targets: Targets): void {
  write(KEYS.targets, targets)
}

export function hasOnboarded(): boolean {
  return getProfile() !== null && getTargets() !== null
}

type LogsByDate = Record<string, LogEntry[]>

function getAllLogs(): LogsByDate {
  return read<LogsByDate>(KEYS.logs) ?? {}
}

export function getLogsForDate(date: string = todayKey()): LogEntry[] {
  return getAllLogs()[date] ?? []
}

export function addLogEntry(entry: LogEntry, date: string = todayKey()): LogEntry[] {
  const all = getAllLogs()
  const dayLogs = all[date] ?? []
  all[date] = [...dayLogs, entry]
  write(KEYS.logs, all)
  return all[date]
}

export function removeLogEntry(entryId: string, date: string = todayKey()): LogEntry[] {
  const all = getAllLogs()
  all[date] = (all[date] ?? []).filter((e) => e.id !== entryId)
  write(KEYS.logs, all)
  return all[date]
}

export function getPreferences(): Preferences {
  return read<Preferences>(KEYS.preferences) ?? { suggestionsEnabled: true }
}

export function savePreferences(prefs: Preferences): void {
  write(KEYS.preferences, prefs)
}
