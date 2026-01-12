<template>
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26.38 16.95"
    :width="size"
    :height="size"
    class="logo-icon"
  >
    <g id="logo_1_white" data-name="logo 1 white">
      <path
        :fill="fillColor"
        d="M16.02,2.81v2.83h7.53l-2.83,2.83h-4.71v.06c-.03,4.65-3.6,8.42-8,8.42S0,13.15,0,8.47h2.72c0,3.09,2.37,5.6,5.28,5.6.8,0,1.57-.19,2.25-.53V2.83H.01V0h26.37v2.83h-10.36v-.02Z"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  size: {
    type: [String, Number],
    default: 40,
  },
  color: {
    type: String,
    default: 'primary',
  },
})

const theme = useTheme()

// Get the color value from Vuetify theme
const fillColor = computed(() => {
  const themeColors = theme.current.value.colors
  return themeColors[props.color] || themeColors.primary || '#ffffff'
})
</script>

<style scoped lang="scss">
.logo-icon {
  display: block;
}
</style>
