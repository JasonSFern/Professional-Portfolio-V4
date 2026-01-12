<template>
  <v-tooltip v-if="props.size === 'compact'" location="bottom">
    <template #activator="{ props }">
      <v-btn
        icon
        variant="text"
        v-bind="props"
        @click="onModeChange(currentMode == 'light' ? 'dark' : 'light')"
      >
        <v-icon :class="currentMode == 'light' ? 'sun-glow' : 'moon-glow'">{{
          currentMode == 'light' ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'
        }}</v-icon>
      </v-btn>
    </template>

    <p v-if="currentMode == 'light'" class="font-weight-bold text-center mb-0 primary-color-c">
      Switch to Dark Mode
    </p>
    <p v-else class="font-weight-bold text-center mb-0">Switch to Light Mode</p>
  </v-tooltip>

  <v-list-item v-else v-bind="props" @click="onModeChange(currentMode == 'light' ? 'dark' : 'light')">
    <template #prepend>
      <v-icon className="">{{
        currentMode == 'light' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
      }}</v-icon>
    </template>
    <v-list-item-title>{{
      currentMode == 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
    }}</v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
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

const { currentMode, setThemeMode } = useThemeMode()

// Handle mode change
const onModeChange = (mode: 'light' | 'dark') => {
  setThemeMode(mode)
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
