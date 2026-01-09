import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: false,
  },
}).append(
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  }
)
