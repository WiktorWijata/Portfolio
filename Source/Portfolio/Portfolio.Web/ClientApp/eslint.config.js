import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Colours live in the theme files (src/design-system/theme); code refers to tokens by name.
const rawColour = String.raw`#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\(`
const defaultPalette = String.raw`(?:^|[\s:"'])(?:bg|text|border|border-[trblxyse]|fill|stroke|from|via|to|ring|outline|caret|divide|decoration|shadow)-(?:white|black|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})\b`
const themeMessage =
  'No raw colours in code: use a token from the theme (src/design-system/theme), e.g. bg-surface-card.'

export default defineConfig([
  // orval-generated API client ("Do not edit manually") — not hand-written, so it isn't held to the
  // project's lint rules (e.g. a newer react-hooks rule flags a mutation pattern orval itself emits).
  globalIgnores(['dist', 'build', 'src/api/generated']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: `Literal[value=/${rawColour}/]`, message: themeMessage },
        { selector: `TemplateElement[value.raw=/${rawColour}/]`, message: themeMessage },
        { selector: `Literal[value=/${defaultPalette}/]`, message: themeMessage },
        { selector: `TemplateElement[value.raw=/${defaultPalette}/]`, message: themeMessage },
      ],
    },
  },
  {
    // The changelog is prose about past releases, so it may quote the values that were current then.
    files: ['src/docs/changelog.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  {
    // Docs registry files export their entry list next to the demo components they define.
    files: ['src/docs/demos/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
