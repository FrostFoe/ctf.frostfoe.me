// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier/flat'

export default defineConfig([
  // ✅ Next.js + Core Web Vitals (React, Hooks, JSX-a11y)
  ...nextVitals,

  // ✅ TypeScript rules
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // ✅ Prettier disables formatting rules conflicting with ESLint
  prettier,

  // ✅ Custom project rules
  {
    languageOptions: {
      parserOptions: {
        project: true, // uses your tsconfig.json automatically
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Core stylistic rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // handled by TS
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React
      'react/react-in-jsx-scope': 'off', // Next.js auto-imports React
      'react/jsx-uses-react': 'off',

      // Accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'off', // handled by @next/next/no-html-link-for-pages

      // Next.js best practices
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': ['error', 'src/app'],

      // TypeScript strictness
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },

  // ✅ Ignore generated & build artifacts
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
    // config files that are not included in tsconfig and cause parserOptions.project errors
    'eslint.config.mjs',
    'postcss.config.mjs',
    'node_modules/**',
  ]),
])
