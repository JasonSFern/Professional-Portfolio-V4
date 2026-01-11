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
 *
 * Colored Text:
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
 *
 * Images with Positioning:
 * ![alt](url|position) - Image with position
 * ![My Image](image.jpg|left) - Image floated to left
 * ![My Image](image.jpg|right) - Image floated to right
 * ![My Image](image.jpg|top) - Image on top (full width)
 * ![My Image](image.jpg|bottom) - Image on bottom (full width)
 * ![My Image](image.jpg) - Default (top position)
 *
 * Positions: left, right, top, bottom
 * On small screens (<768px), all images render as 'top' position
 */

const processImages = (html: string): string => {
  // Replace images with position info: ![alt](url|position)
  // The pipe character is URL-encoded as %7C by marked
  const regex = /<img\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>/g

  return html.replace(regex, (match, url, alt) => {
    // Decode URL-encoded pipe character (%7C = |)
    const decodedUrl = decodeURIComponent(url)

    // Extract position from URL if it was included
    const parts = decodedUrl.split('|')
    const actualUrl = parts[0]
    const imagePosition = parts[1] || 'top'

    const positionClass = `img-position-${imagePosition}`

    return `<div class="markdown-image-wrapper ${positionClass}">
      <img src="${actualUrl}" alt="${alt}" class="markdown-image" loading="lazy" />
    </div>`
  })
}

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
      if (mod.startsWith('w') && /^w\d+$/.test(mod)) {
        const weight = mod.substring(1)
        styles.push(`font-weight: ${weight}`)
      }
      // Underline modifier
      else if (mod === 'underline') {
        classes.push('text-decoration-underline')
      }
      // Glow modifiers
      else if (mod === 'glow' || mod.startsWith('glow-')) {
        classes.push('glow')

        // Map glow levels to text-shadow values
        switch (mod) {
          case 'glow':
          case 'glow-low':
            styles.push(`text-shadow: 0 0 10px rgb(var(--v-theme-${color}))`)
            break
          case 'glow-medium':
            styles.push(`text-shadow: 0 0 21px rgb(var(--v-theme-${color}))`)
            break
          case 'glow-high':
            styles.push(`text-shadow: 0 0 41px rgb(var(--v-theme-${color}))`)
            break
          case 'glow-ultra':
            styles.push(`text-shadow: 0 0 10px rgb(var(--v-theme-${color})),
            0 0 21px rgb(var(--v-theme-${color})), 0 0 42px rgb(var(--v-theme-${color}))`)
            break
        }
      }
    })

    // Return a span with color styling
    return `<span class="${classes.join(' ')}" style="${styles.join('; ')}">${content}</span>`
  })
}

const renderedContent = computed(() => {
  // Handle empty or undefined content
  if (!props.content) {
    return ''
  }

  // Configure marked options for proper line break handling
  marked.setOptions({
    breaks: true, // Treat single line breaks as <br>
    gfm: true, // GitHub Flavored Markdown
  })

  let content = props.content

  // Preprocess: Replace sequences of 3+ newlines with a placeholder that includes count
  // This preserves the spacing information before markdown processes it
  const spacingPlaceholders: string[] = []
  content = content.replace(/\n{3,}/g, (match) => {
    const blankLineCount = match.length - 1
    const placeholder = `XSPACINGMARKERX${spacingPlaceholders.length}XSPACINGMARKERX`
    spacingPlaceholders.push('<br>'.repeat(blankLineCount - 1)) // -1 because markdown already adds one paragraph break
    return '\n\n' + placeholder + '\n\n'
  })

  // Convert markdown to HTML
  let html = props.inline
    ? (marked.parseInline(content) as string)
    : (marked.parse(content) as string)

  // Post-process: Replace placeholders with actual <br> tags
  spacingPlaceholders.forEach((spacing, index) => {
    const placeholder = `XSPACINGMARKERX${index}XSPACINGMARKERX`
    // Handle various ways markdown might have wrapped the placeholder
    html = html.replace(new RegExp(`<p>${placeholder}</p>\\s*`, 'g'), spacing)
    html = html.replace(new RegExp(`<p>${placeholder}</p>`, 'g'), spacing)
    html = html.replace(new RegExp(placeholder, 'g'), spacing)
  })

  // Clean up any extra whitespace around the spacing elements
  html = html.replace(/(<br>)\s+(<br>)/g, '$1$2')

  // Add list-style classes to lists to override Tailwind's reset
  // Tailwind removes list styles by default, so we need to add them back
  html = html.replace(
    /<ol>/g,
    '<ol style="list-style-type: decimal; list-style-position: inside;">'
  )
  html = html.replace(/<ul>/g, '<ul style="list-style-type: disc; list-style-position: inside;">')

  // Process images with positioning
  html = processImages(html)

  // Process custom ColoredText syntax
  html = processColoredText(html)

  return html
})
</script>

<style lang="scss">
.markdown-content {
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

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.75em;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    font-size: 1.25em;
  }

  h5 {
    font-size: 1.1em;
  }

  h6 {
    font-size: 1em;
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
  }

  // Image positioning styles
  .markdown-image-wrapper {
    margin: 1.5rem 0;
    display: block;

    .markdown-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: block;
    }

    // Top position (default) - full width
    &.img-position-top {
      width: 100%;
      margin-bottom: 2rem;
    }

    // Bottom position - full width
    &.img-position-bottom {
      width: 100%;
      margin-top: 2rem;
    }

    // Left position - floated to left on desktop
    &.img-position-left {
      @media (min-width: 768px) {
        float: left !important;
        width: 45% !important;
        margin-top: 0px;
        margin-right: 2rem !important;
        margin-bottom: 1rem !important;
      }
    }

    // Right position - floated to right on desktop
    &.img-position-right {
      @media (min-width: 768px) {
        float: right !important;
        width: 45% !important;
        margin-top: 0px;
        margin-left: 2rem !important;
        margin-bottom: 1rem !important;
      }
    }

    // On mobile, all images are full width (top position)
    @media (max-width: 767px) {
      &.img-position-left,
      &.img-position-right {
        float: none !important;
        width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  }

  // Clear floats after content
  p:has(+ .markdown-image-wrapper),
  .markdown-image-wrapper:has(+ p) {
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .glow {
    transition: all 0.2s ease;
    &:hover {
      filter: brightness(1.2);
    }
  }
}

// Add clearfix after markdown content to handle floats
.markdown-content::after {
  content: '';
  display: table;
  clear: both;
}
</style>
