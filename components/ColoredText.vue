<template>
  <span
    :style="{ color: themeColor, textShadow: glowEffect, fontWeight: weight }"
    :class="{
      'text-decoration-underline': underline,
    }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

/// Helpers
import { hexToRgba } from '@/helpers/general'

// Interfaces
import { GlowLevel } from '@/types/general'
const props = withDefaults(
  defineProps<{
    /**
     * Color from Vuetify theme
     * Options: 'primary', 'secondary', 'accent', 'error', 'info', 'success', 'warning'
     * Or any custom color from your Vuetify theme
     */
    color: string
    /**
     * Make text bold
     */
    weight?: Number
    /**
     * Underline text
     */
    underline?: boolean
    /**
     * Glow effect
     */
    glow?: GlowLevel | undefined
  }>(),
  {
    color: 'primary',
    bold: false,
    underline: false,
    glow: undefined,
  }
)

// Access Vuetify theme to get actual color values
const theme = useTheme()

// Get the color from the current theme
const themeColor = computed(() => {
  return theme.current.value.colors[props.color] || props.color
})

// Get the glow affect for the current theme
const glowEffect = computed(() => {
  if (!props.glow) return ''

  // The theme color needs to be converted from hash color to rgb value for this to work
  switch (props.glow) {
    case GlowLevel.Low:
      return `0 0 10px ${hexToRgba(theme.current.value.colors[props.color] || props.color)}`
    case GlowLevel.Medium:
      return `0 0 21px ${hexToRgba(theme.current.value.colors[props.color] || props.color)}`
    case GlowLevel.High:
      return `0 0 41px ${hexToRgba(theme.current.value.colors[props.color] || props.color)}`
    case GlowLevel.Ultra:
      return `0 0 10px ${hexToRgba(theme.current.value.colors[props.color] || props.color)},
      0 0 21px ${hexToRgba(
        theme.current.value.colors[props.color] || props.color
      )}, 0 0 42px ${hexToRgba(theme.current.value.colors[props.color] || props.color)}`
    default:
      return ''
  }
})

// // Use Vuetify's text color utility classes
// const textColorClass = computed(() => `text-${props.color}`)
</script>

<style scoped>
span {
  transition: all 0.2s ease;
}

/* Optional: Add subtle hover effect */
span:hover {
  filter: brightness(1.2);
}
</style>
