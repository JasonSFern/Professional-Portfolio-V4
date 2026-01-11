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

        <!-- Theme Selector -->
        <div class="ml-4">
          <ThemeSelector />
        </div>
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

      <!-- Theme Selector in Mobile -->
      <v-list-item>
        <ThemeSelector />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const navItems = [
  { label: 'Home', to: '/', icon: 'mdi-home' },
  { label: 'About', to: '/about', icon: 'mdi-account' },
  { label: 'Projects', to: '/projects', icon: 'mdi-briefcase' },
  { label: 'Contact', to: '/contact', icon: 'mdi-email' },
]
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
</style>
