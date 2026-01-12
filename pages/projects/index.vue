<template>
  <div class="projects-page-wrapper">
    <!-- Desktop Version -->
    <div class="desktop-view">
      <!-- Category Filter Buttons -->
      <div class="category-filters">
        <v-btn
          :variant="selectedCategory === null ? 'flat' : 'text'"
          :color="selectedCategory === null ? 'primary' : 'default'"
          @click="selectedCategory = null"
          class="filter-btn"
        >
          All
        </v-btn>
        <v-btn
          v-for="category in categories"
          :key="category"
          :variant="selectedCategory === category ? 'flat' : 'text'"
          :color="selectedCategory === category ? 'primary' : 'default'"
          @click="selectedCategory = category"
          class="filter-btn"
        >
          {{ category }}
        </v-btn>
      </div>

      <!-- Project Navigation Dots -->
      <div class="project-navigation">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="nav-square"
          :class="{ active: currentProjectIndex === index }"
          @click="scrollToProject(index)"
          :title="project.title"
        ></div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="project-section">
        <div class="project-content centered">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          <p class="mt-4">Loading projects...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="project-section">
        <div class="project-content centered">
          <v-icon size="64" color="error">mdi-alert-circle</v-icon>
          <h2 class="mt-4">Error loading projects</h2>
          <p class="text-error">{{ error.message }}</p>
        </div>
      </div>

      <!-- Projects Snap Scroll Container -->
      <div
        v-else-if="filteredProjects && filteredProjects.length > 0"
        class="projects-snap-container"
        ref="snapContainer"
        @scroll="handleScroll"
      >
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-section"
          :data-index="index"
        >
          <div class="project-content">
            <h1 class="project-title">{{ getProjectTitle(project) }}</h1>

            <div class="project-details">
              <p v-if="project.subtitle" class="project-subtitle">{{ project.subtitle }}</p>

              <div v-if="project.category" class="project-category mb-4">
                <v-chip color="primary" variant="tonal">{{ project.category }}</v-chip>
              </div>

              <div v-if="project.photos?.titlecard" class="project-image-container mb-6">
                <v-img
                  :src="project.photos.titlecard"
                  :alt="getProjectTitle(project)"
                  max-height="400"
                  max-width="800"
                  cover
                  class="project-image elevation-8 rounded-lg"
                />
              </div>

              <div class="project-description mb-6">
                {{ getProjectDescription(project) }}
              </div>

              <div
                v-if="project.skills?.icons && project.skills.icons.length > 0"
                class="project-skills mb-6"
              >
                <v-chip
                  v-for="(skill, idx) in project.skills.icons.slice(0, 6)"
                  :key="idx"
                  size="small"
                  variant="tonal"
                  color="secondary"
                  class="mr-2 mb-2"
                >
                  {{ skill }}
                </v-chip>
              </div>

              <div class="project-actions">
                <v-btn
                  color="primary"
                  variant="elevated"
                  :to="`/projects/${project.projectCode}`"
                  size="large"
                >
                  View Full Details
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>

                <v-btn
                  v-for="link in project.links"
                  :key="link.label"
                  :href="link.path"
                  target="_blank"
                  variant="tonal"
                  size="large"
                  :prepend-icon="getLinkIcon(link.icon)"
                  class="ml-2"
                  @click.stop
                >
                  {{ link.label }}
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Projects State -->
      <div v-else class="project-section">
        <div class="project-content centered">
          <v-icon size="64" color="grey">mdi-folder-open-outline</v-icon>
          <h2 class="mt-4">No Projects Found</h2>
          <p class="text-medium-emphasis">
            {{
              selectedCategory
                ? `No projects in "${selectedCategory}" category`
                : 'Check back soon for new projects!'
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Mobile Version -->
    <div class="mobile-view">
      <v-container>
        <div class="projects-page">
          <div class="page-header mb-8">
            <h1 class="text-h2 mb-4">Projects</h1>
            <p class="text-h6 text-medium-emphasis">
              A collection of my recent work and side projects
            </p>
          </div>

          <!-- Category Filter for Mobile -->
          <div v-if="categories.length > 0" class="mobile-category-filters mb-6">
            <v-chip
              :variant="selectedCategory === null ? 'flat' : 'outlined'"
              :color="selectedCategory === null ? 'primary' : 'default'"
              @click="selectedCategory = null"
              class="mr-2 mb-2"
            >
              All
            </v-chip>
            <v-chip
              v-for="category in categories"
              :key="category"
              :variant="selectedCategory === category ? 'flat' : 'outlined'"
              :color="selectedCategory === category ? 'primary' : 'default'"
              @click="selectedCategory = category"
              class="mr-2 mb-2"
            >
              {{ category }}
            </v-chip>
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

          <div v-else-if="filteredProjects && filteredProjects.length > 0" class="projects-grid">
            <v-card
              v-for="project in filteredProjects"
              :key="project.id"
              class="project-card"
              :to="`/projects/${project.projectCode}`"
              hover
            >
              <v-img
                v-if="project.photos?.titlecard"
                :src="project.photos.titlecard"
                :alt="getProjectTitle(project)"
                height="200"
                cover
                class="project-image"
              >
                <div class="image-overlay">
                  <v-chip
                    v-if="project.category"
                    color="primary"
                    size="small"
                    class="project-type-chip"
                  >
                    {{ project.category }}
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

                <div v-if="project.skills?.icons" class="featured-skills mb-3">
                  <v-chip
                    v-for="(skill, index) in project.skills.icons.slice(0, 4)"
                    :key="index"
                    size="small"
                    variant="tonal"
                    color="secondary"
                  >
                    {{ skill }}
                  </v-chip>
                  <v-chip v-if="project.skills.icons.length > 4" size="small" variant="text">
                    +{{ project.skills.icons.length - 4 }} more
                  </v-chip>
                </div>

                <div class="project-links">
                  <v-btn
                    v-for="link in project.links"
                    :key="link.label"
                    :href="link.path"
                    target="_blank"
                    variant="text"
                    size="small"
                    :prepend-icon="getLinkIcon(link.icon)"
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
            <p class="text-medium-emphasis">
              {{
                selectedCategory
                  ? `No projects in "${selectedCategory}" category`
                  : 'Check back soon for new projects!'
              }}
            </p>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
const { switchTheme } = useThemeSwitch()

// Fetch all projects
const { data: projects, pending, error } = await useFetch('/api/projects')

// Reactive state
const selectedCategory = ref(null)
const currentProjectIndex = ref(0)
const snapContainer = ref(null)
let isScrolling = false
let scrollTimeout = null

// Get unique categories from projects
const categories = computed(() => {
  if (!projects.value) return []
  const cats = [...new Set(projects.value.map((p) => p.category).filter(Boolean))]
  return cats.sort()
})

// Filter projects by selected category
const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (selectedCategory.value === null) return projects.value
  return projects.value.filter((p) => p.category === selectedCategory.value)
})

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
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .split('\n')
      .filter((line) => line.trim())
      .slice(0, 2)
      .join(' ')
    return plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '')
  }
  return 'No description available'
}

// Helper to get icon for link type
const getLinkIcon = (icon) => {
  if (icon) {
    if (icon === 'github') return 'mdi-github'
    if (icon === 'external-link') return 'mdi-open-in-new'
    if (icon.startsWith('mdi-')) return icon
  }
  return 'mdi-link'
}

// Scroll to specific project
const scrollToProject = (index) => {
  if (!snapContainer.value) return
  const sections = snapContainer.value.querySelectorAll('.project-section')
  if (sections[index]) {
    sections[index].scrollIntoView({ behavior: 'smooth' })

    // Apply theme when clicking navigation squares
    const targetProject = filteredProjects.value[index]
    if (targetProject?.displayTheme) {
      applyProjectTheme(targetProject.displayTheme)
    }
  }
}

// Handle scroll to update current project index and theme
const handleScroll = () => {
  if (!snapContainer.value) return
  const container = snapContainer.value
  const scrollTop = container.scrollTop
  const sectionHeight = container.clientHeight
  const newIndex = Math.round(scrollTop / sectionHeight)

  // Only update if index changed
  if (newIndex !== currentProjectIndex.value) {
    currentProjectIndex.value = newIndex

    // Switch theme based on current project's displayTheme
    const currentProject = filteredProjects.value[newIndex]
    if (currentProject?.displayTheme) {
      applyProjectTheme(currentProject.displayTheme)
    }
  }
}

// Apply theme from displayTheme string (format: "themeName--mode")
const applyProjectTheme = (displayTheme) => {
  if (!displayTheme) return

  // Parse the displayTheme string
  const parts = displayTheme.split('--')
  const themeName = parts[0]
  const mode = parts[1] || 'dark' // Default to dark if mode not specified

  // Use the theme switch hook to apply the theme
  switchTheme(themeName, mode)
}

// Handle wheel event for snap scrolling
const handleWheel = (event) => {
  if (!snapContainer.value || isScrolling) return

  event.preventDefault()

  const delta = event.deltaY
  const maxIndex = filteredProjects.value.length - 1

  // Determine scroll direction
  if (delta > 0 && currentProjectIndex.value < maxIndex) {
    // Scroll down
    isScrolling = true
    scrollToProject(currentProjectIndex.value + 1)
  } else if (delta < 0 && currentProjectIndex.value > 0) {
    // Scroll up
    isScrolling = true
    scrollToProject(currentProjectIndex.value - 1)
  }

  // Reset scrolling flag after animation completes
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(() => {
    isScrolling = false
  }, 1000)
}

// Reset category filter when projects change
const resetFilter = () => {
  selectedCategory.value = null
  currentProjectIndex.value = 0
}

// Watch for category changes and scroll to top
const handleCategoryChange = () => {
  if (snapContainer.value) {
    snapContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
  currentProjectIndex.value = 0

  // Apply theme of first project in filtered list
  const firstProject = filteredProjects.value[0]
  if (firstProject?.displayTheme) {
    applyProjectTheme(firstProject.displayTheme)
  }
}

// Setup observer for category changes and wheel event listener
onMounted(() => {
  // Apply initial theme for first project
  const firstProject = filteredProjects.value[0]
  if (firstProject?.displayTheme) {
    applyProjectTheme(firstProject.displayTheme)
  }

  let prevCategory = selectedCategory.value
  const interval = setInterval(() => {
    if (prevCategory !== selectedCategory.value) {
      handleCategoryChange()
      prevCategory = selectedCategory.value
    }
  }, 100)

  // Add wheel event listener to snap container with slight delay to ensure DOM is ready
  setTimeout(() => {
    if (snapContainer.value) {
      snapContainer.value.addEventListener('wheel', handleWheel, { passive: false })
    }
  }, 100)

  onUnmounted(() => {
    clearInterval(interval)
    if (snapContainer.value) {
      snapContainer.value.removeEventListener('wheel', handleWheel)
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })
})
</script>

<style scoped lang="scss">
.projects-page-wrapper {
  height: 100vh;
  overflow: hidden;
}

/* Desktop View */
.desktop-view {
  display: none;
  height: 100vh;
  position: relative;

  @media (min-width: 960px) {
    display: block;
  }
}

/* Category Filter Buttons */
.category-filters {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 0.5rem;
  background: rgba(var(--v-theme-surface), 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .filter-btn {
    text-transform: none;
    font-weight: 500;
  }
}

/* Project Navigation Squares */
.project-navigation {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .nav-square {
    width: 16px;
    height: 16px;
    background: rgba(var(--v-theme-on-surface), 0.2);
    border: 2px solid rgba(var(--v-theme-on-surface), 0.4);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(var(--v-theme-primary), 0.4);
      border-color: rgb(var(--v-theme-primary));
      transform: scale(1.2);
    }

    &.active {
      background: rgb(var(--v-theme-primary));
      border-color: rgb(var(--v-theme-primary));
      width: 20px;
      height: 20px;
    }
  }
}

/* Projects Snap Scroll Container */
.projects-snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

/* Individual Project Section */
.project-section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.project-content {
  max-width: 900px;
  width: 100%;
  text-align: center;

  &.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.project-title {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 1280px) {
    font-size: 3rem;
  }
}

.project-details {
  margin-top: 2rem;
}

.project-subtitle {
  font-size: 1.5rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
  margin-bottom: 1.5rem;
}

.project-category {
  display: flex;
  justify-content: center;
}

.project-image-container {
  display: flex;
  justify-content: center;

  .project-image {
    border-radius: 12px;
  }
}

.project-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(var(--v-theme-on-surface), 0.8);
  max-width: 700px;
  margin: 0 auto;
}

.project-skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

/* Mobile View */
.mobile-view {
  display: block;

  @media (min-width: 960px) {
    display: none;
  }
}

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

.mobile-category-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
    background: none;
    -webkit-text-fill-color: unset;
  }

  .project-description {
    color: rgba(var(--v-theme-on-surface), 0.7);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
    font-size: 1rem;
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
