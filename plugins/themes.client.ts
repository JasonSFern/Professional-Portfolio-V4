import { customThemes, getAvailableThemes } from '~/config/themes'

export default defineNuxtPlugin(() => {
  const getThemeData = (themeName: string) => {
    if (themeName.includes('--')) {
      const themeNameSplit = themeName.split('--')
      const themeKey = themeNameSplit[0] as keyof typeof customThemes
      const mode = themeNameSplit[1]
      if ((mode === 'light' || mode === 'dark') && customThemes[themeKey]) {
        return customThemes[themeKey][mode as 'light' | 'dark']
      }
      return undefined
    } else {
      return customThemes[themeName as keyof typeof customThemes]
    }
  }

  const applyCustomTheme = (themeName: string, themeMode: 'light' | 'dark' = 'dark') => {
    if (!customThemes[themeName]) return false

    // This will be called from components that have access to useTheme
    return { themeName, themeMode, colors: customThemes[themeName][themeMode] }
  }

  // Provide the themes and utility functions to the app
  return {
    provide: {
      customThemes,
      getThemeData,
      applyCustomTheme,
      getAvailableThemes,
    },
  }
})
