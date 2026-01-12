import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as any,
    loading: false,
    error: null as Error | null,
    lastFetched: null as number | null,
  }),

  getters: {
    hasProfile: (state) => state.profile !== null,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,

    // Convenience getters for common profile properties
    fullName: (state) => {
      if (!state.profile) return ''
      return `${state.profile.firstName} ${state.profile.lastName}`
    },

    firstName: (state) => state.profile?.firstName || '',
    lastName: (state) => state.profile?.lastName || '',
    location: (state) => state.profile?.location || null,
    motto: (state) => state.profile?.motto || [],
    bio: (state) => state.profile?.bio || [],
    services: (state) => state.profile?.services || null,
    ethos: (state) => state.profile?.ethos || null,
    contact: (state) => state.profile?.contact || {},
  },

  actions: {
    async fetchProfile(force = false) {
      // If we already have profile data and not forcing a refresh, return cached data
      if (this.profile && !force) {
        return this.profile
      }

      // If currently loading, wait for the existing request
      if (this.loading) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (!this.loading) {
              clearInterval(interval)
              resolve(this.profile)
            }
          }, 100)
        })
      }

      this.loading = true
      this.error = null

      try {
        const data = await $fetch('/api/profile')
        this.profile = data
        this.lastFetched = Date.now()
        return data
      } catch (err) {
        this.error = err as Error
        console.error('Error fetching profile:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    clearProfile() {
      this.profile = null
      this.error = null
      this.lastFetched = null
    },

    async refreshProfile() {
      return await this.fetchProfile(true)
    },
  },
})
