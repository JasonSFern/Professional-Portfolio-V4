<template>
  <div>
    <v-app>
      <NuxtRouteAnnouncer />
      <AppHeader />
      <v-main>
        <NuxtPage :transition="{
          name: 'page',
          mode: 'out-in'
        }" />
      </v-main>
      <AppFooter />
    </v-app>
  </div>
</template>

<script setup lang="ts">
// useHead is auto-imported by Nuxt
// @ts-ignore - Nuxt auto-imports
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})
</script>

<style>
@import 'tailwindcss';

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
