<template>
  <v-dialog v-model="dialogModel" max-width="500">
    <v-card>
      <v-card-title class="text-h6 d-flex align-center justify-space-between">
        Theme Settings
        <v-btn icon variant="text" size="small" @click="dialogModel = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
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
                <v-icon :color="item.raw.color" start size="small">{{ item.raw.icon }}</v-icon>
                {{ item.raw.displayName }}
              </template>
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-btn-toggle
              v-model="themeMode"
              mandatory
              color="primary"
              class="w-100"
              @update:model-value="onModeChange"
            >
              <v-btn value="light" variant="outlined" class="flex-grow-1">
                <v-icon start>mdi-white-balance-sunny</v-icon>
                Light
              </v-btn>
              <v-btn value="dark" variant="outlined" class="flex-grow-1">
                <v-icon start>mdi-moon-waning-crescent</v-icon>
                Dark
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useTheme } from 'vuetify'
import { getAvailableThemes } from '../config/themes'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const theme = useTheme()

// Get available themes from shared config
const availableThemes = getAvailableThemes()

const selectedTheme = ref('cloud')
const themeMode = ref<'light' | 'dark'>('dark')

// Two-way binding for the dialog
const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

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
.w-100 {
  width: 100%;
}
</style>
