// Syncs the `.dark` class on <html> with the OS color-scheme preference,
// since shadcn's Nova preset drives dark mode off that class instead of
// the `prefers-color-scheme` media query directly.
export function initThemeSync(): void {
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  function apply(isDark: boolean) {
    document.documentElement.classList.toggle('dark', isDark)
  }

  apply(media.matches)
  media.addEventListener('change', (e) => apply(e.matches))
}
