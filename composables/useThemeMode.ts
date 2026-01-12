import { useTheme } from 'vuetify'

const THEME_STORAGE_KEY = 'theme-mode'
const DEFAULT_THEME = 'cloud'

export const useThemeMode = () => {
  const theme = useTheme()
  const themeCookie = useCookie<'light' | 'dark'>(THEME_STORAGE_KEY, {
    default: () => 'dark',
    watch: true,
  })

  // Initialize from cookie (works on both server and client)
  const currentMode = ref<'light' | 'dark'>(themeCookie.value)

  const setThemeMode = (mode: 'light' | 'dark') => {
    currentMode.value = mode
    themeCookie.value = mode

    // Also sync to localStorage for redundancy
    if (import.meta.client) {
      localStorage.setItem(THEME_STORAGE_KEY, mode)
      // Update document immediately to prevent flash
      document.documentElement.setAttribute('data-theme', mode)
    }

    theme.global.name.value = `${DEFAULT_THEME}--${mode}`
  }

  // Initialize theme immediately (not in onMounted to prevent FOUC)
  const storedMode = themeCookie.value
  currentMode.value = storedMode
  theme.global.name.value = `${DEFAULT_THEME}--${storedMode}`

  // Set data-theme attribute on client
  if (import.meta.client) {
    document.documentElement.setAttribute('data-theme', storedMode)
  }

  return {
    currentMode: readonly(currentMode),
    setThemeMode,
  }
}
