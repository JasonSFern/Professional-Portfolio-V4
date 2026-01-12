<template>
  <v-container>
    <div v-if="pending" class="text-center py-16">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Loading profile...</p>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon size="64" color="error">mdi-alert-circle</v-icon>
      <h2 class="mt-4">Error loading profile</h2>
      <p class="text-error">{{ error.message }}</p>
    </div>

    <div v-else-if="profile" class="about-page">
      <!-- Header Section -->
      <div class="profile-header mb-8">
        <h1 class="text-h2 mb-4">
          {{ profile.firstName }}
          <ColoredText color="primary" :weight="700">{{ profile.lastName }}</ColoredText>
        </h1>

        <!-- Motto -->
        <div class="motto mb-4">
          <span v-for="(item, index) in profile.motto" :key="index">
            <MarkdownRenderer :content="item.text" inline class="motto-item" />
            {{ index < profile.motto.length - 1 ? ' ' : '' }}
          </span>
        </div>

        <!-- Location -->
        <div class="location mb-4">
          <v-icon>mdi-map-marker</v-icon>
          {{ profile.location.city }}, {{ profile.location.state }}, {{ profile.location.country }}
        </div>
      </div>

      <!-- Bio Section -->
      <v-card class="mb-8 pa-6">
        <Title title="About Me" size="large" class="mb-4" />
        <div v-for="(paragraph, index) in profile.bio" :key="index">
          <MarkdownRenderer :content="paragraph" class="mb-4" />
        </div>
      </v-card>

      <!-- Services Section -->
      <v-card class="mb-8 pa-6">
        <Title title="Services" size="large" class="mb-4" />
        <MarkdownRenderer :content="profile.services.intro" class="mb-6" />

        <div
          v-for="(service, index) in profile.services.content"
          :key="index"
          class="service-item mb-6"
        >
          <h3 class="text-h5 mb-2">
            <ColoredText color="secondary" :weight="600">{{ service.title }}</ColoredText>
          </h3>
          <div v-for="(desc, descIndex) in service.description" :key="descIndex">
            <MarkdownRenderer :content="desc" class="mb-2" />
          </div>
        </div>
      </v-card>

      <!-- Ethos Section -->
      <v-card class="mb-8 pa-6">
        <Title title="My Philosophy" size="large" class="mb-4" />
        <MarkdownRenderer :content="profile.ethos.intro" class="mb-6" />

        <div v-for="(value, index) in profile.ethos.values" :key="index" class="ethos-item mb-6">
          <h3 class="text-h5 mb-2">
            <ColoredText color="accent" :weight="600">{{ value.title }}</ColoredText>
          </h3>
          <div v-for="(point, pointIndex) in value.points" :key="pointIndex">
            <MarkdownRenderer :content="point" class="mb-2" />
          </div>
        </div>
      </v-card>

      <!-- Skills Section -->
      <v-card class="mb-8 pa-6">
        <Title title="Skills & Technologies" size="large" class="mb-4" />

        <div v-if="skillsPending" class="text-center py-8">
          <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
        </div>

        <div v-else-if="skillsError" class="text-center py-8">
          <p class="text-error">Failed to load skills</p>
        </div>

        <div v-else-if="skillsByCategory" class="skills-container">
          <div
            v-for="(categorySkills, category) in skillsByCategory"
            :key="category"
            class="skill-category mb-6"
          >
            <h3 class="text-h6 mb-3">
              <ColoredText :color="getCategoryColor(category)" :weight="600">
                {{ category }}
              </ColoredText>
            </h3>

            <div class="skills-grid">
              <v-chip
                v-for="skill in categorySkills"
                :key="skill.id"
                :color="getCategoryColor(category)"
                variant="tonal"
                class="skill-chip"
              >
                <template v-if="skill.icon" v-slot:prepend>
                  <v-avatar size="20">
                    <v-img :src="skill.icon" :alt="skill.name"></v-img>
                  </v-avatar>
                </template>
                {{ skill.name }}
                <template v-slot:append>
                  <div class="proficiency-indicator">
                    <v-icon
                      v-for="i in 5"
                      :key="i"
                      size="x-small"
                      :color="
                        i <= skill.proficiency ? getCategoryColor(category) : 'grey-lighten-2'
                      "
                    >
                      mdi-circle
                    </v-icon>
                  </div>
                </template>
              </v-chip>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Contact Section -->
      <v-card class="pa-6">
        <Title title="Get In Touch" size="large" class="mb-4" />
        <div class="contact-grid">
          <div v-for="(contact, key) in profile.contact" :key="key" class="contact-item">
            <v-icon class="mr-2">{{ getContactIcon(key) }}</v-icon>
            <a v-if="contact.link" :href="contact.link" target="_blank" class="contact-link">
              {{ contact.label }}
            </a>
            <span v-else>{{ contact.label }}</span>
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio - About',
  description: 'Professional portfolio showcasing skills, projects, and experience',
})

import { computed } from 'vue'

// Use profile composable to access global profile data
const { profile, loading: pending, error } = useProfile()

// Fetch skills data from API (keeping this as direct fetch for now)
const { data: skills, pending: skillsPending, error: skillsError } = await useFetch('/api/skills')

// Group skills by category
const skillsByCategory = computed(() => {
  if (!skills.value) return {}

  const grouped = {}
  skills.value.forEach((skill) => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = []
    }
    grouped[skill.category].push(skill)
  })
  return grouped
})

// Get color for each category
const getCategoryColor = (category) => {
  const colorMap = {
    Frontend: 'primary',
    Backend: 'secondary',
    Database: 'accent',
    Languages: 'success',
    Tools: 'info',
    Other: 'warning',
  }
  return colorMap[category] || 'primary'
}

// Helper function to get icon for contact type
const getContactIcon = (contactType: string) => {
  const iconMap = {
    email: 'mdi-email',
    phone: 'mdi-phone',
    linkedin: 'mdi-linkedin',
    github: 'mdi-github',
    twitter: 'mdi-twitter',
    website: 'mdi-web',
    discord: 'mdi-discord',
  }
  return iconMap[contactType.toLowerCase()] || 'mdi-link'
}
</script>

<style scoped lang="scss">
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}

.profile-header {
  text-align: center;

  h1 {
    font-weight: 700;
  }

  .motto {
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 1rem;

    .motto-item {
      display: inline;
    }
  }

  .location {
    color: rgba(var(--v-theme-on-surface), 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}

.service-item,
.ethos-item {
  h3 {
    margin-bottom: 0.5rem;
  }
}

.skills-container {
  .skill-category {
    h3 {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-chip {
    height: auto;
    padding: 0.75rem 0.5rem;

    .proficiency-indicator {
      display: flex;
      gap: 2px;
      margin-left: 0.5rem;
    }
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 8px;

  .contact-link {
    color: rgb(var(--v-theme-primary));
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
}
</style>
