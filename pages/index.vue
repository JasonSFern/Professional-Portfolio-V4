<template>
  <v-container>
    <div class="home-page">
      <v-card v-if="profile" class="mt-4 pa-4">
        <h1 class="mb-4">
          {{ profile.firstName }}
          <ColoredText color="accent" :weight="700" :glow="2">{{ profile.lastName }}</ColoredText>
        </h1>

        <MarkdownRenderer :content="fullText" class="mt-2" />
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio - Home',
  description: 'Professional portfolio showcasing skills, projects, and experience',
})

// Fetch profile data from API
const { data: profile, pending, error } = await useFetch('/api/profile')

const fullText = `
# Welcome to my {accent|w800|glow-medium:portfolio!!}

## This is my portfolio!
### The headers are getting smaller!
#### And smaller...!
##### And smaller!
###### And I think that is it!


I'm a passionate **full-stack developer** with expertise in:

1. First item
2. Second item
3. Third item
4. Fourth item

- **Frontend**: React, Vue.js, Nuxt.js
- **Backend**: Node.js, Express, Django
- ***Database***: PostgreSQL, MongoDB

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

<https://www.markdownguide.org>   
<fake@example.com>

> "Code is *like* \`humor\`. When you have to explain it, it's bad." - Cory House
`
</script>

<style scoped lang="scss">
.home-page {
  padding: 2rem 0;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
