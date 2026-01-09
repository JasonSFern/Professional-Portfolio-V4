import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { customThemes } from './config/themes'

// Helper function to create theme variants
function createThemeVariant(colors: Record<string, string>, isDark: boolean) {
  return {
    dark: isDark,
    colors: {
      ...colors,
      'on-background': isDark ? '#ffffff' : '#000000',
    },
  }
}

// Generate theme configuration for Vuetify
function generateThemes() {
  const themes: Record<string, any> = {}

  Object.entries(customThemes).forEach(([themeName, themeData]) => {
    // Light variant
    themes[`${themeName}--light`] = createThemeVariant(themeData.light, false)
    // Dark variant
    themes[`${themeName}--dark`] = createThemeVariant(themeData.dark, true)
  })

  return themes
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'cloud--dark',
    themes: generateThemes(),
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'elevated',
    },
  },
})
