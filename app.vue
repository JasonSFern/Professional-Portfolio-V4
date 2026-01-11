<template>
  <div>
    <v-app>
      <NuxtRouteAnnouncer />
      <AppHeader />
      <v-main>
        <NuxtPage />
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
</style>
