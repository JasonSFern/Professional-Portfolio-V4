<template>
  <v-app :theme="$vuetify.theme.name">
    <AppHeader />
    <v-main class="error-main">
      <v-container class="error-page">
        <div class="error-content">
          <!-- Error Code -->
          <div class="error-code">
            <ColoredText color="primary" :weight="900" :glow="GlowLevel.High" class="error-number">
              {{ error.statusCode }}
            </ColoredText>
          </div>

          <div class="error-code">
            <ColoredText
              color="secondary"
              :weight="900"
              :glow="GlowLevel.Ultra"
              class="error-character"
            >
              {{ chosenText }}
            </ColoredText>
          </div>

          <!-- Error Message -->
          <h2 class="error-title">
            {{ errorTitle }}
          </h2>

          <p class="error-message">
            {{ errorMessage }}
          </p>

          <!-- Actions -->
          <div class="error-actions">
            <v-btn color="primary" size="large" variant="flat" @click="handleError">
              <v-icon start>mdi-home</v-icon>
              Back to Home
            </v-btn>

            <v-btn color="surface-variant" size="large" variant="outlined" @click="goBack">
              <v-icon start>mdi-arrow-left</v-icon>
              Go Back
            </v-btn>
          </div>

          <!-- Helpful Links -->
          <div class="helpful-links">
            <p class="links-title">Maybe you're looking for:</p>
            <div class="links-grid">
              <NuxtLink to="/about" class="link-item">
                <v-icon size="small">mdi-account</v-icon>
                About
              </NuxtLink>
              <NuxtLink to="/projects" class="link-item">
                <v-icon size="small">mdi-briefcase</v-icon>
                Projects
              </NuxtLink>
              <NuxtLink to="/contact" class="link-item">
                <v-icon size="small">mdi-email</v-icon>
                Contact
              </NuxtLink>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { NuxtError } from '#app'

import { GlowLevel } from './types/general'
import gsap from 'gsap'

const props = defineProps<{
  error: NuxtError
}>()

const text = ref<string[]>(["(>'-')>", "<('-'<)"])
const chosenText = ref<string>("(>'-')>")

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Internal Server Error'
    case 403:
      return 'Access Forbidden'
    default:
      return 'An Error Occurred'
  }
})

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "The page you're looking for doesn't exist. It might have been moved or deleted."
    case 500:
      return 'Something went wrong on our end. Please try again later.'
    case 403:
      return "You don't have permission to access this resource."
    default:
      return props.error.message || 'An unexpected error occurred.'
  }
})

onMounted(() => {
  gsap
    .timeline()
    .fromTo('.error-character', { opacity: 0 }, { duration: 0.5, opacity: 1, delay: 0.25 })
    .fromTo('.error-number', { opacity: 0 }, { duration: 0.75, opacity: 1, delay: 1.0 })
    .fromTo(
      '.error-title, .error-message',
      { opacity: 0 },
      { duration: 0.5, opacity: 1, delay: 0.25 }
    )
    .fromTo(
      '.error-actions, .helpful-links',
      { opacity: 0 },
      { duration: 0.5, opacity: 1, delay: 0.25 }
    )

  setInterval(() => {
    let chosenIndex = Math.floor(Math.random() * text.value.length)
    chosenText.value = text.value[chosenIndex] ?? text.value[0]!
  }, 500)
})

const handleError = () => {
  clearError({ redirect: '/' })
}

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    clearError({ redirect: '/' })
  }
}
</script>

<style lang="scss">
@import 'assets/scss/main.scss';
</style>

<style scoped lang="scss">
.error-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: none !important;
}

.error-content {
  background: none !important;
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-code {
  margin-bottom: 1.5rem;

  .error-number {
    font-size: clamp(6rem, 15vw, 15rem);
    line-height: 1;
    opacity: 0.9;
  }
  .error-character {
    color: var(--v-theme-accent);
    font-size: 3rem;
    line-height: 1;
    opacity: 0.9;
  }
}

.error-title {
  // font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: rgb(var(--v-theme-on-surface));
}

.error-message {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.helpful-links {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);

  .links-title {
    font-size: 0.875rem;
    color: rgb(var(--v-theme-on-surface));
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .links-grid {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .link-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
  }
}

.error-main {
  background-color: rgb(var(--v-theme-background));
}

@media (max-width: 600px) {
  .error-actions {
    flex-direction: column;
    width: 100%;

    .v-btn {
      width: 100%;
    }
  }
}
</style>
