import { useTheme } from 'vuetify'
import { customThemes } from '~/config/themes'

/**
 * Composable for switching themes by name and mode
 *
 * @example
 * const { switchTheme, currentThemeName, currentThemeMode } = useThemeSwitch()
 * switchTheme('galaxy', 'dark') // Switch to galaxy dark theme
 * switchTheme('cloud') // Switch to cloud theme (defaults to dark mode)
 */
export const useThemeSwitch = () => {
  const theme = useTheme()
  const THEME_NAME_STORAGE_KEY = 'theme-name'
  const THEME_MODE_STORAGE_KEY = 'theme-mode'

  // Cookies for persistence (SSR compatible)
  const themeNameCookie = useCookie<string>(THEME_NAME_STORAGE_KEY, {
    default: () => 'cloud',
    watch: true,
  })

  const themeModeCookie = useCookie<'light' | 'dark'>(THEME_MODE_STORAGE_KEY, {
    default: () => 'dark',
    watch: true,
  })

  // Reactive state
  const currentThemeName = ref<string>(themeNameCookie.value)
  const currentThemeMode = ref<'light' | 'dark'>(themeModeCookie.value)

  /**
   * Validates if a theme name exists in the available themes
   */
  const isValidTheme = (name: string): boolean => {
    return name in customThemes
  }

  /**
   * Validates if a mode is valid (light or dark)
   */
  const isValidMode = (mode: string): mode is 'light' | 'dark' => {
    return mode === 'light' || mode === 'dark'
  }

  /**
   * Switch to a specific theme by name and mode
   *
   * @param name - Theme name (e.g., 'cloud', 'galaxy', 'forest')
   * @param mode - Theme mode ('light' or 'dark'). Defaults to 'dark' if invalid or not provided
   * @returns boolean - true if theme was successfully switched, false if theme name is invalid
   */
  const switchTheme = (name: string, mode?: string): boolean => {
    // Validate theme name
    if (!isValidTheme(name)) {
      console.warn(`[useThemeSwitch] Invalid theme name: "${name}". Theme not changed.`)
      return false
    }

    // Determine the mode to use (default to dark if invalid or not provided)
    let themeMode: 'light' | 'dark' = 'dark'
    if (mode && isValidMode(mode)) {
      themeMode = mode
    } else if (mode) {
      console.warn(`[useThemeSwitch] Invalid mode: "${mode}". Defaulting to dark mode.`)
    }

    // Update state
    currentThemeName.value = name
    currentThemeMode.value = themeMode

    // Update cookies
    themeNameCookie.value = name
    themeModeCookie.value = themeMode

    // Update Vuetify theme
    const fullThemeName = `${name}--${themeMode}`
    theme.global.name.value = fullThemeName

    // Update localStorage for redundancy (client-side only)
    if (import.meta.client) {
      localStorage.setItem(THEME_NAME_STORAGE_KEY, name)
      localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode)

      // Update data-theme attribute on document
      document.documentElement.setAttribute('data-theme', themeMode)
      document.documentElement.setAttribute('data-theme-name', name)
    }

    return true
  }

  /**
   * Toggle between light and dark mode for the current theme
   */
  const toggleMode = () => {
    const newMode = currentThemeMode.value === 'dark' ? 'light' : 'dark'
    return switchTheme(currentThemeName.value, newMode)
  }

  /**
   * Get the list of available theme names
   */
  const getAvailableThemeNames = (): string[] => {
    return Object.keys(customThemes)
  }

  /**
   * Get theme metadata for a specific theme
   */
  const getThemeMetadata = (name: string) => {
    if (!isValidTheme(name)) return null

    return {
      name,
      icon: customThemes[name].icon,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      hasLightMode: !!customThemes[name].light,
      hasDarkMode: !!customThemes[name].dark,
    }
  }

  // Initialize theme on mount (SSR compatible)
  if (import.meta.client) {
    const storedName = themeNameCookie.value
    const storedMode = themeModeCookie.value

    if (isValidTheme(storedName)) {
      switchTheme(storedName, storedMode)
    }
  }

  return {
    // State
    currentThemeName: readonly(currentThemeName),
    currentThemeMode: readonly(currentThemeMode),

    // Methods
    switchTheme,
    toggleMode,
    getAvailableThemeNames,
    getThemeMetadata,
    isValidTheme,
  }
}
