<template>
  <v-container>
    <div class="home-page">
      <Title title="Welcome to My Portfolio" size="xlarge" gradient animated />

      <div class="mt-8">
        <Title title="About Me" size="large" />

        <p class="mt-4">
          I specialize in
          <ColoredText color="primary" bold>Vue.js</ColoredText>,
          <ColoredText color="success">Node.js</ColoredText>, and
          <ColoredText color="info">TypeScript</ColoredText>.
        </p>
      </div>

      <div class="mt-8">
        <Title title="Theme Controls" size="medium" />
        <ThemeSelector />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
// Theme switching is now handled by the ThemeSelector component
</script>

<style scoped lang="scss">
.home-page {
  padding: 2rem 0;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
