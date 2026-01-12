<template>
  <div>
    <v-app>
      <NuxtRouteAnnouncer />
      <AppHeader />
      <v-main>
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
          }"
        />
      </v-main>
      <AppFooter />
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  script: [
    {
      innerHTML: `
        (function() {
          function getInitialTheme() {
            var cookieMatch = document.cookie.match(/theme-mode=([^;]+)/);
            if (cookieMatch) {
              var cookieValue = cookieMatch[1];
              if (cookieValue === 'light' || cookieValue === 'dark') {
                return cookieValue;
              }
            }
            try {
              var stored = localStorage.getItem('theme-mode');
              if (stored === 'light' || stored === 'dark') {
                return stored;
              }
            } catch (e) {}
            return 'dark';
          }
          var theme = getInitialTheme();
          document.documentElement.setAttribute('data-theme', theme);
        })();
      `,
    },
  ],
  style: [
    {
      innerHTML: `
        :root {
          --bg-color-dark: #121212;
          --text-color-dark: #ffffff;
          --bg-color-light: #ffffff;
          --text-color-light: #000000;
        }
        html {
          background-color: var(--bg-color-dark);
        }
        html[data-theme="light"] {
          background-color: var(--bg-color-light);
        }
        body {
          background-color: var(--bg-color-dark);
          color: var(--text-color-dark);
        }
        html[data-theme="light"] body {
          background-color: var(--bg-color-light);
          color: var(--text-color-light);
        }
      `,
    },
  ],
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
