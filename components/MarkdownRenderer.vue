<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  /**
   * Markdown content to render
   */
  content: {
    type: String,
    required: true,
  },
  /**
   * Render as inline (no paragraph wrapper)
   */
  inline: {
    type: Boolean,
    default: false,
  },
})

/**
 * Custom syntax:
 * {color:text} - Renders colored text
 * {primary:Hello} - Primary colored text
 * {secondary|w700:World} - Secondary color with weight 700
 * {accent|w800|glow:Amazing} - Accent color with weight 800 and glow effect
 * {primary|glow-high:Text} - Primary color with high glow level
 *
 * Modifiers:
 * - w[number]: Font weight (e.g., w400, w700, w800)
 * - underline: Add underline
 * - glow: Add glow effect (default level)
 * - glow-low: Low glow effect
 * - glow-medium: Medium glow effect
 * - glow-high: High glow effect
 * - glow-ultra: Ultra glow effect
 */
const processColoredText = (html: string): string => {
  // Replace {color:text} syntax with actual HTML/component markup
  const regex = /\{([^:]+):([^}]+)\}/g

  return html.replace(regex, (match, options, content) => {
    const [color, ...modifiers] = options.split('|')

    // Build class names and styles based on modifiers
    const classes = ['colored-text', `text-${color}`]
    const styles: string[] = [`color: rgb(var(--v-theme-${color}))`]

    modifiers.forEach((mod) => {
      // Font weight modifier (e.g., w700, w800)
      if (mod.startsWith('weight')) {
        const weight = mod.substring(1)
        styles.push(`font-weight: ${weight}`)
      }
      // Underline modifier
      else if (mod === 'underline') {
        classes.push('text-decoration-underline')
      }
      // Glow modifiers
      else if (mod === 'glow' || mod.startsWith('glow-')) {
        // Map glow levels to text-shadow values
        switch (mod) {
          case 'glow':
          case 'glow-low':
            classes.push('glow-low')
            styles.push(`text-shadow: 0 0 10px rgb(var(--v-theme-${color}))`)
            break
          case 'glow-medium':
            classes.push('glow-medium')
            styles.push(`text-shadow: 0 0 21px rgb(var(--v-theme-${color}))`)
            break
          case 'glow-high':
            classes.push('glow-high')
            styles.push(`text-shadow: 0 0 41px rgb(var(--v-theme-${color}))`)
            break
          case 'glow-ultra':
            styles.push(`text-shadow: 0 0 10px rgb(var(--v-theme-${color})),
            0 0 21px rgb(var(--v-theme-${color})), 0 0 42px rgb(var(--v-theme-${color}))`)
            classes.push('glow-ultra')
            break
        }
      }
    })

    // Return a span with color styling
    return `<span class="${classes.join(' ')}" style="${styles.join('; ')}">${content}</span>`
  })
}

const renderedContent = computed(() => {
  // Convert markdown to HTML
  let html = props.inline
    ? (marked.parseInline(props.content) as string)
    : (marked.parse(props.content) as string)

  // Process custom ColoredText syntax
  html = processColoredText(html)

  return html
})
</script>

<style scoped lang="scss">
:deep(.markdown-content) {
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  code {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  blockquote {
    border-left: 4px solid rgb(var(--v-theme-primary));
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    opacity: 0.8;
  }

  a {
    color: rgb(var(--v-theme-primary));
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }

  .colored-text {
    font-weight: 600;
    transition: all 0.3s ease;

    &.has-glow {
      &.glow-low {
        text-shadow: 0 0 10px currentColor;
      }

      &.glow-medium {
        text-shadow: 0 0 21px currentColor;
      }

      &.glow-high {
        text-shadow: 0 0 41px currentColor;
      }

      &.glow-ultra {
        text-shadow: 0 0 10px currentColor, 0 0 21px currentColor, 0 0 42px currentColor;
      }
    }
  }
}
</style>
