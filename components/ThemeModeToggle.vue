<template>
  <v-tooltip v-if="props.size === 'compact'" location="bottom">
    <template #activator="{ props }">
      <v-btn
        icon
        variant="text"
        v-bind="props"
        @click="onModeChange(themeMode == 'light' ? 'dark' : 'light')"
      >
        <v-icon :class="themeMode == 'light' ? 'sun-glow' : 'moon-glow'">{{
          themeMode == 'light' ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'
        }}</v-icon>
      </v-btn>
    </template>

    <p v-if="themeMode == 'light'" class="font-weight-bold text-center mb-0 primary-color-c">
      Switch to Dark Mode
    </p>
    <p v-else class="font-weight-bold text-center mb-0">Switch to Light Mode</p>
  </v-tooltip>

  <v-list-item v-else v-bind="props" @click="onModeChange(themeMode == 'light' ? 'dark' : 'light')">
    <template #prepend>
      <v-icon className="">{{
        themeMode == 'light' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
      }}</v-icon>
    </template>
    <v-list-item-title>{{
      themeMode == 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
    }}</v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { getAvailableThemes } from '../config/themes'

const theme = useTheme()

const props = withDefaults(
  defineProps<{
    /**
     * Choose version for either just an icon or for the mobile menu
     */
    size: 'full' | 'compact'
  }>(),
  {
    size: 'full',
  }
)

const selectedTheme = ref('cloud')
const themeMode = ref<'light' | 'dark'>('dark')

// Initialize with current theme
onMounted(() => {
  const currentTheme = theme.global.name.value
  if (currentTheme.includes('--')) {
    const mode = currentTheme.split('--')[1]
    themeMode.value = mode as 'light' | 'dark'
  }
})

// Handle mode change
const onModeChange = (mode: 'light' | 'dark') => {
  console.log(`Changing mode to: ${mode}`)
  const newTheme = `${selectedTheme.value}--${mode}`
  theme.global.name.value = newTheme
  themeMode.value = mode
}
</script>

<style scoped lang="scss">
.theme-selector-card {
  margin: 1rem 0;
}

.sun-glow {
  text-shadow: 0 0 10px #face33, 0 0 21px #face33, 0 0 42px #face33;
  color: #face33 !important;
}

.moon-glow {
  text-shadow: 0 0 10px #ffffff, 0 0 21px #ffffff, 0 0 42px #ffffff;
}
</style>
