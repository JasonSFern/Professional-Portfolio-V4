<template>
  <v-container>
    <div class="projects-page">
      <div class="page-header mb-8">
        <h1 class="text-h2 mb-4">
          <!-- My <ColoredText color="primary" :weight="700">Projects</ColoredText> -->
        </h1>
        <p class="text-h6 text-medium-emphasis">A collection of my recent work and side projects</p>
      </div>

      <div v-if="pending" class="text-center py-16">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4">Loading projects...</p>
      </div>

      <div v-else-if="error" class="text-center py-16">
        <v-icon size="64" color="error">mdi-alert-circle</v-icon>
        <h2 class="mt-4">Error loading projects</h2>
        <p class="text-error">{{ error.message }}</p>
      </div>

      <div v-else-if="projects && projects.length > 0" class="projects-grid">
        <v-card
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          :to="`/projects/${project.projectCode}`"
          hover
        >
          <v-img
            v-if="project.photos?.thumbnail"
            :src="project.photos.thumbnail"
            :alt="getProjectTitle(project)"
            height="200"
            cover
            class="project-image"
          >
            <div class="image-overlay">
              <v-chip
                v-if="project.contents?.[0]?.type"
                color="primary"
                size="small"
                class="project-type-chip"
              >
                {{ project.contents[0].type }}
              </v-chip>
            </div>
          </v-img>

          <v-card-title class="project-title">
            {{ getProjectTitle(project) }}
          </v-card-title>

          <v-card-text>
            <div class="project-description mb-4">
              {{ getProjectDescription(project) }}
            </div>

            <div v-if="project.skills?.featured" class="featured-skills mb-3">
              <v-chip
                v-for="(skill, index) in project.skills.featured.slice(0, 4)"
                :key="index"
                size="small"
                variant="tonal"
                color="secondary"
              >
                {{ skill }}
              </v-chip>
              <v-chip v-if="project.skills.featured.length > 4" size="small" variant="text">
                +{{ project.skills.featured.length - 4 }} more
              </v-chip>
            </div>

            <div class="project-links">
              <v-btn
                v-for="link in project.links"
                :key="link.label"
                :href="link.url"
                target="_blank"
                variant="text"
                size="small"
                :prepend-icon="getLinkIcon(link.label)"
                @click.stop
              >
                {{ link.label }}
              </v-btn>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" :to="`/projects/${project.projectCode}`">
              View Details
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div v-else class="text-center py-16">
        <v-icon size="64" color="grey">mdi-folder-open-outline</v-icon>
        <h2 class="mt-4">No Projects Found</h2>
        <p class="text-medium-emphasis">Check back soon for new projects!</p>
      </div>
    </div>
  </v-container>
</template>

<script setup>
// Fetch all projects
const { data: projects, pending, error } = await useFetch('/api/projects')

// Helper to get project title
const getProjectTitle = (project) => {
  return project.title || 'Untitled Project'
}

// Helper to get project description
const getProjectDescription = (project) => {
  if (project.subtitle) {
    return project.subtitle
  }
  // Extract plain text from first markdown content section
  const firstContent = project.contents?.[0]
  if (firstContent) {
    // Remove markdown syntax for preview
    const plainText = firstContent
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\{[^}]+:[^}]+\}/g, '') // Remove colored text syntax
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .split('\n')[0] // Get first line
    return plainText.substring(0, 150) + '...'
  }
  return 'No description available'
}

// Helper to get icon for link type
const getLinkIcon = (label) => {
  const lowerLabel = label.toLowerCase()
  if (lowerLabel.includes('github')) return 'mdi-github'
  if (lowerLabel.includes('demo') || lowerLabel.includes('live')) return 'mdi-open-in-new'
  if (lowerLabel.includes('video')) return 'mdi-video'
  return 'mdi-link'
}
</script>

<style scoped lang="scss">
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.page-header {
  text-align: center;

  h1 {
    font-weight: 700;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }

  .project-image {
    position: relative;

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }

    .project-type-chip {
      backdrop-filter: blur(8px);
    }
  }

  .project-title {
    font-weight: 600;
    font-size: 1.25rem;
  }

  .project-description {
    color: rgba(var(--v-theme-on-surface), 0.7);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .featured-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
