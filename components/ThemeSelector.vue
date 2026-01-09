<template>
  <v-card class="theme-selector-card" elevation="2">
    <v-card-title class="text-h6">Theme Selector</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedTheme"
            :items="themeOptions"
            item-title="displayName"
            item-value="value"
            label="Select Theme"
            density="comfortable"
            variant="outlined"
            @update:model-value="onThemeChange"
          >
            <template #prepend-item>
              <v-list-item>
                <v-list-item-title class="text-subtitle-2 font-weight-bold">
                  Available Themes
                </v-list-item-title>
              </v-list-item>
              <v-divider class="mb-2"></v-divider>
            </template>
            <template #item="{ props, item }">
              <v-list-item v-bind="props">
                <template #prepend>
                  <v-icon :color="item.raw.color">{{ item.raw.icon }}</v-icon>
                </template>
              </v-list-item>
            </template>
            <template #selection="{ item }">
              <v-chip :color="item.raw.color" size="small" class="mr-2">
                <v-icon start size="small">{{ item.raw.icon }}</v-icon>
                {{ item.raw.displayName }}
              </v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn-toggle
            v-model="themeMode"
            mandatory
            color="primary"
            @update:model-value="onModeChange"
          >
            <v-btn value="light" variant="outlined">
              <v-icon start>mdi-white-balance-sunny</v-icon>
              Light
            </v-btn>
            <v-btn value="dark" variant="outlined">
              <v-icon start>mdi-moon-waning-crescent</v-icon>
              Dark
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { getAvailableThemes } from '../config/themes'

const theme = useTheme()

// Get available themes from shared config
const availableThemes = getAvailableThemes()

const selectedTheme = ref('cloud')
const themeMode = ref<'light' | 'dark'>('dark')

// Create theme options for the select
const themeOptions = computed(() => {
  return availableThemes.map((t: any) => ({
    value: t.name,
    displayName: t.displayName,
    icon: t.icon,
    color: t.displayColor,
  }))
})

// Initialize with current theme
onMounted(() => {
  const currentTheme = theme.global.name.value
  if (currentTheme.includes('--')) {
    const [name, mode] = currentTheme.split('--')
    selectedTheme.value = name
    themeMode.value = mode as 'light' | 'dark'
  }
})

// Handle theme change
const onThemeChange = (themeName: string) => {
  const newTheme = `${themeName}--${themeMode.value}`
  theme.global.name.value = newTheme
}

// Handle mode change
const onModeChange = (mode: 'light' | 'dark') => {
  const newTheme = `${selectedTheme.value}--${mode}`
  theme.global.name.value = newTheme
}
</script>

<style scoped lang="scss">
.theme-selector-card {
  margin: 1rem 0;
}
</style>
