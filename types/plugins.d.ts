// Type definitions for custom plugins
declare module '#app' {
  interface NuxtApp {
    $themes: {
      customThemes: Record<
        string,
        {
          light: Record<string, string>
          dark: Record<string, string>
          icon: string
        }
      >
      getThemeData: (themeName: string) => any
      applyCustomTheme: (themeName: string, themeMode?: 'light' | 'dark') => any
      getAvailableThemes: () => Array<{
        name: string
        icon: string
        displayName: string
        displayColor: string
      }>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $themes: {
      customThemes: Record<
        string,
        {
          light: Record<string, string>
          dark: Record<string, string>
          icon: string
        }
      >
      getThemeData: (themeName: string) => any
      applyCustomTheme: (themeName: string, themeMode?: 'light' | 'dark') => any
      getAvailableThemes: () => Array<{
        name: string
        icon: string
        displayName: string
        displayColor: string
      }>
    }
  }
}

export {}
