<template>
  <div>
    <v-app>
      <NuxtRouteAnnouncer />
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})
</script>

<style>
@import 'tailwindcss';
</style>
