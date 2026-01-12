import { computed } from 'vue'
import { useProfileStore } from '~/stores/profile'

/**
 * Composable to access profile data from the global store
 *
 * This composable provides easy access to profile data that is loaded once
 * when first accessed and cached in the global store.
 *
 * @example
 * const { profile, loading, error, fullName, refresh } = useProfile()
 */
export const useProfile = () => {
  const store = useProfileStore()

  // Fetch profile data on first use (using callOnce to ensure it only runs once)
  // Only fetch if we don't have data yet
  if (!store.hasProfile && !store.loading) {
    callOnce('profile:fetch', async () => {
      try {
        await store.fetchProfile()
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      }
    })
  }

  return {
    // Profile data
    profile: computed(() => store.profile),

    // State
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    hasProfile: computed(() => store.hasProfile),

    // Convenience getters
    fullName: computed(() => store.fullName),
    firstName: computed(() => store.firstName),
    lastName: computed(() => store.lastName),
    location: computed(() => store.location),
    motto: computed(() => store.motto),
    bio: computed(() => store.bio),
    services: computed(() => store.services),
    ethos: computed(() => store.ethos),
    contact: computed(() => store.contact),

    // Actions
    refresh: () => store.refreshProfile(),
    clear: () => store.clearProfile(),
  }
}
