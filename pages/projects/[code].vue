<template>
  <v-container>
    <div v-if="pending" class="text-center py-16">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Loading project...</p>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <v-icon size="64" color="error">mdi-alert-circle</v-icon>
      <h2 class="mt-4">Project Not Found</h2>
      <p class="text-error">{{ error.message }}</p>
      <v-btn color="primary" to="/projects" class="mt-4">
        <v-icon start>mdi-arrow-left</v-icon>
        Back to Projects
      </v-btn>
    </div>

    <div v-else-if="project" class="project-detail-page">
      <!-- Breadcrumbs -->
      <v-breadcrumbs
        :items="breadcrumbs"
        class="px-0 mb-4"
      >
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <!-- Project Header -->
      <div class="project-header mb-8">
        <h1 class="text-h2 mb-4">
          {{ getProjectTitle() }}
        </h1>
        <p v-if="getProjectSubheading()" class="text-h5 text-medium-emphasis mb-4">
          {{ getProjectSubheading() }}
        </p>

        <!-- Project Links -->
        <div v-if="project.links && project.links.length > 0" class="project-actions mb-6">
          <v-btn
            v-for="link in project.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            color="primary"
            variant="tonal"
            :prepend-icon="getLinkIcon(link.label)"
            class="mr-2 mb-2"
          >
            {{ link.label }}
          </v-btn>
        </div>
      </div>

      <!-- Project Images -->
      <v-card v-if="project.photos && hasPhotos()" class="mb-8">
        <v-carousel
          v-if="getPhotoArray().length > 1"
          height="500"
          show-arrows="hover"
          cycle
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="(photo, index) in getPhotoArray()"
            :key="index"
            :src="photo"
            cover
          ></v-carousel-item>
        </v-carousel>
        <v-img
          v-else-if="getPhotoArray().length === 1"
          :src="getPhotoArray()[0]"
          height="500"
          cover
        ></v-img>
      </v-card>

      <!-- Project Content Sections -->
      <div v-if="project.contents && project.contents.length > 0">
        <v-card
          v-for="(section, index) in project.contents"
          :key="index"
          class="mb-6 pa-6"
        >
          <MarkdownRenderer :content="section" />
        </v-card>
      </div>

      <!-- Skills Used -->
      <v-card v-if="project.skills" class="mb-6 pa-6">
        <Title title="Technologies Used" size="large" class="mb-4" />

        <div v-if="project.skills.featured" class="skill-section mb-4">
          <h3 class="text-h6 mb-3">
            <ColoredText color="secondary" :weight="600">Featured Technologies</ColoredText>
          </h3>
          <div class="skills-grid">
            <v-chip
              v-for="(skill, index) in project.skills.featured"
              :key="index"
              color="secondary"
              variant="tonal"
              size="large"
            >
              {{ skill }}
            </v-chip>
          </div>
        </div>

        <div v-if="project.skills.other" class="skill-section">
          <h3 class="text-h6 mb-3">
            <ColoredText color="accent" :weight="600">Additional Technologies</ColoredText>
          </h3>
          <div class="skills-grid">
            <v-chip
              v-for="(skill, index) in project.skills.other"
              :key="index"
              color="accent"
              variant="tonal"
            >
              {{ skill }}
            </v-chip>
          </div>
        </div>
      </v-card>

      <!-- Back to Projects -->
      <div class="text-center mt-8">
        <v-btn color="primary" to="/projects" size="large">
          <v-icon start>mdi-arrow-left</v-icon>
          Back to All Projects
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'

const route = useRoute()
const projectCode = route.params.code

// Fetch project by code
const { data: project, pending, error } = await useFetch(`/api/projects/${projectCode}`)

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: 'Home', to: '/', disabled: false },
  { title: 'Projects', to: '/projects', disabled: false },
  { title: getProjectTitle(), disabled: true },
])

// Helper functions
const getProjectTitle = () => {
  return project.value?.title || 'Project Details'
}

const getProjectSubheading = () => {
  return project.value?.subtitle || ''
}

const hasPhotos = () => {
  const photos = project.value?.photos
  if (!photos) return false
  return photos.main || photos.thumbnail || (photos.gallery && photos.gallery.length > 0)
}

const getPhotoArray = () => {
  const photos = project.value?.photos
  if (!photos) return []

  const photoArray = []
  if (photos.main) photoArray.push(photos.main)
  if (photos.gallery && photos.gallery.length > 0) {
    photoArray.push(...photos.gallery)
  }
  if (photoArray.length === 0 && photos.thumbnail) {
    photoArray.push(photos.thumbnail)
  }
  return photoArray
}

const getLinkIcon = (label) => {
  const lowerLabel = label.toLowerCase()
  if (lowerLabel.includes('github')) return 'mdi-github'
  if (lowerLabel.includes('demo') || lowerLabel.includes('live')) return 'mdi-open-in-new'
  if (lowerLabel.includes('video')) return 'mdi-video'
  return 'mdi-link'
}
</script>

<style scoped lang="scss">
.project-detail-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.project-header {
  h1 {
    font-weight: 700;
  }

  .project-actions {
    display: flex;
    flex-wrap: wrap;
  }
}

.content-sections {
  line-height: 1.8;
}

.skill-section {
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}
</style>
