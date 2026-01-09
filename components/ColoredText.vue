<template>
  <span
    :style="{ color: themeColor }"
    :class="{
      'font-weight-bold': bold,
      'text-decoration-underline': underline,
    }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  /**
   * Color from Vuetify theme
   * Options: 'primary', 'secondary', 'accent', 'error', 'info', 'success', 'warning'
   * Or any custom color from your Vuetify theme
   */
  color: {
    type: String,
    default: 'primary',
  },
  /**
   * Make text bold
   */
  bold: {
    type: Boolean,
    default: false,
  },
  /**
   * Underline text
   */
  underline: {
    type: Boolean,
    default: false,
  },
})

// Access Vuetify theme to get actual color values
const theme = useTheme()

// Get the color from the current theme
const themeColor = computed(() => {
  return theme.current.value.colors[props.color] || props.color
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
