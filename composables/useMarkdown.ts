import { marked } from 'marked'

/**
 * Composable for rendering markdown text
 */
export const useMarkdown = () => {
  /**
   * Parse markdown text to HTML
   * @param markdown - The markdown string to parse
   * @param options - Optional marked configuration
   * @returns HTML string
   */
  const parseMarkdown = (markdown: string, options?: marked.MarkedOptions): string => {
    if (!markdown) return ''

    // Configure marked options
    const defaultOptions: marked.MarkedOptions = {
      breaks: true, // Convert \n to <br>
      gfm: true, // GitHub Flavored Markdown
      ...options,
    }

    marked.setOptions(defaultOptions)

    return marked.parse(markdown) as string
  }

  /**
   * Parse markdown inline (no paragraph wrapping)
   * @param markdown - The markdown string to parse
   * @returns HTML string without <p> wrapper
   */
  const parseMarkdownInline = (markdown: string): string => {
    if (!markdown) return ''

    return marked.parseInline(markdown) as string
  }

  /**
   * Sanitize HTML to prevent XSS (basic implementation)
   * For production, consider using DOMPurify
   */
  const sanitize = (html: string): string => {
    const div = document.createElement('div')
    div.textContent = html
    return div.innerHTML
  }

  return {
    parseMarkdown,
    parseMarkdownInline,
    sanitize,
  }
}
