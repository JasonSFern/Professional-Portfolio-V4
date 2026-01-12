<template>
  <v-footer app class="px-3 py-3 footer-wrapper">
    <div class="d-flex w-100 align-center footer-panel footer-frosted rounded-lg px-3">
      <div class="footer-content">
        <!-- Left Section - Tech Stack Button -->
        <div class="footer-section footer-left">
          <v-btn
            variant="outlined"
            color="primary"
            size="small"
            prepend-icon="mdi-code-braces"
            @click="techDialog = true"
          >
            Built With ❤️ + ☕️
          </v-btn>
        </div>

        <!-- Center Section - Copyright -->
        <div class="footer-section footer-center">
          <p class="text-body-2">
            © {{ currentYear }}
            <ColoredText color="primary" :weight="600">Portfolio</ColoredText>
            . All rights reserved.
          </p>
        </div>

        <!-- Right Section - Social Links -->
        <div class="footer-section footer-right">
          <v-btn
            v-for="social in socialLinks"
            :key="social.name"
            :icon="social.icon"
            :href="social.url"
            target="_blank"
            variant="text"
            size="small"
            :aria-label="social.name"
          ></v-btn>
        </div>
      </div>
    </div>

    <!-- Tech Stack Modal -->
    <v-dialog v-model="techDialog" max-width="800">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-code-braces</v-icon>
            <span>Technologies Used</span>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="techDialog = false"></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6">
          <div class="tech-intro mb-6">
            <p class="text-body-1">
              This portfolio is built with modern web technologies, focusing on performance,
              developer experience, and beautiful UI.
            </p>
          </div>

          <!-- Tech Categories -->
          <div v-for="category in techStack" :key="category.name" class="tech-category mb-6">
            <h3 class="text-h6 mb-3">
              <v-icon :color="category.color" class="mr-2">{{ category.icon }}</v-icon>
              <ColoredText :color="category.color" :weight="600">{{ category.name }}</ColoredText>
            </h3>

            <div class="tech-grid">
              <v-chip
                v-for="tech in category.technologies"
                :key="tech.name"
                :color="category.color"
                variant="tonal"
                :href="tech.url"
                target="_blank"
                class="tech-chip"
              >
                <template v-if="tech.icon" v-slot:prepend>
                  <v-icon size="small">{{ tech.icon }}</v-icon>
                </template>
                {{ tech.name }}
                <template v-if="tech.version" v-slot:append>
                  <span class="text-caption ml-1">v{{ tech.version }}</span>
                </template>
              </v-chip>
            </div>
          </div>

          <!-- Additional Info -->
          <v-divider class="my-4"></v-divider>

          <div class="additional-info">
            <p class="text-body-2 text-medium-emphasis">
              <v-icon size="small" class="mr-1">mdi-github</v-icon>
              View the source code on
              <a
                href="https://github.com/yourusername/portfolio"
                target="_blank"
                class="text-primary"
                >GitHub</a
              >
            </p>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="techDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const techDialog = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { name: 'GitHub', icon: 'mdi-github', url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://linkedin.com/in/yourusername' },
]

const techStack = [
  {
    name: 'Frontend Framework',
    icon: 'mdi-vuejs',
    color: 'primary',
    technologies: [
      { name: 'Nuxt 3', version: '4.2.2', url: 'https://nuxt.com', icon: 'mdi-nuxt' },
      { name: 'Vue 3', version: '3.5.26', url: 'https://vuejs.org', icon: 'mdi-vuejs' },
      {
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org',
        icon: 'mdi-language-typescript',
      },
    ],
  },
  {
    name: 'UI & Styling',
    icon: 'mdi-palette',
    color: 'secondary',
    technologies: [
      { name: 'Vuetify', version: '3.11.6', url: 'https://vuetifyjs.com' },
      { name: 'Tailwind CSS', version: '4.1.18', url: 'https://tailwindcss.com' },
      { name: 'SCSS', url: 'https://sass-lang.com' },
      { name: 'GSAP', version: '3.14.2', url: 'https://gsap.com' },
    ],
  },
  {
    name: '3D Graphics',
    icon: 'mdi-cube-outline',
    color: 'accent',
    technologies: [
      { name: 'Three.js', version: '0.182.0', url: 'https://threejs.org' },
      { name: 'TresJS', version: '5.2.1', url: 'https://tresjs.org' },
    ],
  },
  {
    name: 'Backend & Database',
    icon: 'mdi-database',
    color: 'success',
    technologies: [
      { name: 'PostgreSQL', url: 'https://www.postgresql.org', icon: 'mdi-database' },
      { name: 'Drizzle ORM', version: '0.45.1', url: 'https://orm.drizzle.team' },
      { name: 'Docker', url: 'https://www.docker.com', icon: 'mdi-docker' },
    ],
  },
  {
    name: 'Development Tools',
    icon: 'mdi-tools',
    color: 'info',
    technologies: [
      { name: 'Vite', url: 'https://vitejs.dev' },
      { name: 'ESLint', url: 'https://eslint.org' },
      { name: 'Prettier', url: 'https://prettier.io' },
      { name: 'Vitest', url: 'https://vitest.dev' },
    ],
  },
  {
    name: 'Utilities',
    icon: 'mdi-toolbox',
    color: 'warning',
    technologies: [
      { name: 'Marked', version: '17.0.1', url: 'https://marked.js.org' },
      { name: 'Postgres.js', version: '3.4.8', url: 'https://github.com/porsager/postgres' },
    ],
  },
]
</script>

<style scoped lang="scss">
.footer-wrapper {
  box-shadow: none !important;
  background: transparent !important;
  width: 100%;

  .footer-panel {
    height: 50px !important;

    @media screen and (max-width: 800px) {
      height: auto !important;
    }

    &.footer-frosted {
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

    .footer-content {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 1rem;
      align-items: center;
      padding: 1rem 0;
      width: 100%;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1rem;
      }
    }

    .footer-section {
      display: flex;
      align-items: center;
    }

    .footer-center {
      justify-content: center;
    }

    .footer-right {
      justify-content: flex-end;
      gap: 0.5rem;

      @media (max-width: 960px) {
        justify-content: center;
      }
    }

    .footer-left {
      justify-content: flex-start;
      gap: 0.5rem;

      @media (max-width: 960px) {
        justify-content: center;
      }
    }
  }
}

//
//
//
//
// TODO: For the Modal
.tech-intro {
  background-color: rgba(var(--v-theme-primary), 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.tech-category {
  h3 {
    display: flex;
    align-items: center;
  }
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

.tech-chip {
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.additional-info {
  text-align: center;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
