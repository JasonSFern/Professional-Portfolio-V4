export default defineNuxtPlugin(() => {
  // This runs early on the client to prevent FOUC
  // Get theme from cookie or localStorage
  const getInitialTheme = (): 'light' | 'dark' => {
    // Check cookie first
    const cookieMatch = document.cookie.match(/theme-mode=([^;]+)/)
    if (cookieMatch) {
      const cookieValue = cookieMatch[1]
      if (cookieValue === 'light' || cookieValue === 'dark') {
        return cookieValue
      }
    }

    // Fallback to localStorage
    const stored = localStorage.getItem('theme-mode')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }

    return 'dark'
  }

  const theme = getInitialTheme()
  document.documentElement.setAttribute('data-theme', theme)
})
