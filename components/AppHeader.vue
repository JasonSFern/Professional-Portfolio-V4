<template>
  <v-app-bar :elevation="2" color="surface">
    <v-container class="d-flex align-center">
      <!-- Logo/Brand -->
      <NuxtLink to="/" class="brand-link">
        <div class="brand">
          <ColoredText color="accent" :weight="800" class="brand-text">Portfolio</ColoredText>
        </div>
      </NuxtLink>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav d-none d-md-flex align-center">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="nav-link--active"
        >
          <v-icon v-if="item.icon" size="small" class="mr-1">{{ item.icon }}</v-icon>
          {{ item.label }}
        </NuxtLink>

        <ThemeModeToggle size="compact" />

        <v-btn
          icon
          variant="text"
          class="ml-2"
          @click="themeModalOpen = true"
          aria-label="Open theme settings"
        >
          <v-icon class="rainbow-text">mdi-palette</v-icon>
        </v-btn>
      </nav>

      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="mobile-nav">
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="mobile-nav-item"
        @click="drawer = false"
      >
        <template #prepend>
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-4"></v-divider>

      <ThemeModeToggle size="full" />

      <!-- Theme Settings Button in Mobile -->
      <v-list-item @click="openThemeModal">
        <template #prepend>
          <v-icon class="rainbow-text">mdi-palette</v-icon>
        </template>
        <v-list-item-title>Theme Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- Theme Modal -->
  <ThemeModal v-model="themeModalOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
const themeModalOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/', icon: 'mdi-home' },
  { label: 'About', to: '/about', icon: 'mdi-account' },
  { label: 'Projects', to: '/projects', icon: 'mdi-briefcase' },
  { label: 'Contact', to: '/contact', icon: 'mdi-email' },
]

const openThemeModal = () => {
  drawer.value = false
  themeModalOpen.value = true
}
</script>

<style scoped lang="scss">
.brand-link {
  text-decoration: none;
  color: inherit;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .brand-text {
    font-size: 1.5rem;
    letter-spacing: -0.5px;
  }
}

.desktop-nav {
  gap: 0.5rem;

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: rgb(var(--v-theme-on-surface));
    border-radius: 8px;
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.1);
      color: rgb(var(--v-theme-primary));
    }

    &--active {
      background-color: rgba(var(--v-theme-primary), 0.15);
      color: rgb(var(--v-theme-primary));
      font-weight: 600;
    }
  }
}

.mobile-nav {
  .mobile-nav-item {
    margin: 0.25rem 0.5rem;
    border-radius: 8px;

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.1);
    }
  }
}

.rainbow-text {
  background-image: linear-gradient(
    to top,
    purple,
    purple,
    blue,
    green,
    yellow,
    orange,
    red,
    red
  ) !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  color: transparent !important;
}
</style>
