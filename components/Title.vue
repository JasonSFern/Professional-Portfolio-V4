<template>
  <h1
    :class="[
      'title',
      sizeClass,
      {
        'title--gradient': gradient,
        'title--animated': animated,
      },
    ]"
  >
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  /**
   * The title text to display
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * Size of the title
   * Options: 'small', 'medium', 'large', 'xlarge'
   */
  size: {
    type: String,
    default: 'large',
    validator: (value: string) => ['small', 'medium', 'large', 'xlarge'].includes(value),
  },
  /**
   * Apply gradient effect to title
   */
  gradient: {
    type: Boolean,
    default: false,
  },
  /**
   * Add fade-in animation
   */
  animated: {
    type: Boolean,
    default: false,
  },
})

const sizeClass = computed(() => `title--${props.size}`)
</script>

<style scoped>
.title {
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  transition: all 0.3s ease;
}

.title--small {
  font-size: 1.5rem;
}

.title--medium {
  font-size: 2rem;
}

.title--large {
  font-size: 3rem;
}

.title--xlarge {
  font-size: 4rem;
}

.title--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title--animated {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
