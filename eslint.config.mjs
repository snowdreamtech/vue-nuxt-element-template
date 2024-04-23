// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: [
      'node_modules/*',
      'dist/*',
      '.github/*',
      '.nuxt/*',
      '.output/*',
      'coverage/*'
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off'
      ],
      '@typescript-eslint/no-explicit-any': [
        'off'
      ]
    }
  }
)
