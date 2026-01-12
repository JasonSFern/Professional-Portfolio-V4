<template>
  <v-app-bar :elevation="elevation" app class="px-3 py-2 header-wrapper">
    <div class="d-flex w-100 align-center header-panel frosted rounded-lg px-3">
      <!-- Logo/Brand -->
      <NuxtLink to="/" class="brand-link">
        <div class="brand">
          <p class="desktop-nav d-none d-md-flex">
            <ColoredText color="primary" :weight="400" class="brand-text uppercase"
              >Jason
            </ColoredText>
          </p>
          <p class="desktop-nav d-none d-md-flex">
            <ColoredText
              color="accent"
              :weight="400"
              class="brand-text uppercase"
              :glow="GlowLevel.Medium"
              >Fernandes</ColoredText
            >
          </p>
          <v-img
            src="/logo.svg"
            alt="logo"
            contain
            max-width="40"
            max-height="40"
            class="w-[30px] h-[30px] mx-md-4"
          ></v-img>
        </div>
      </NuxtLink>

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
      </nav>

      <v-spacer></v-spacer>

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
      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </div>
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

import { GlowLevel } from '@/types/general'

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
.header-wrapper {
  box-shadow: none !important;
  background: transparent !important;
}

.header-panel {
  height: 56px !important;
}

.frosted {
  background-color: rgba(152, 151, 151, 0.2) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.32) inset,
    -0.5px -0.5px 1px 0px rgba(255, 255, 255, 0.1) inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 20px;
  border-width: 0;
  border-style: solid;
  border-color: #49549539;
  display: block;
  transition: 0.3s ease-out;
  position: relative;
}

.nav-link .bold a {
  font-size: 0.9rem !important;
  font-family: 'Avenir-Black', sans-serif;
  line-height: 1 !important;
  display: flex;
  align-items: center;
}

//
//
//
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
    font-size: 0.8rem !important;
    font-family: 'Avenir', sans-serif;
    line-height: 1 !important;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.1);
      color: rgb(var(--v-theme-primary));
    }

    &--active {
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
