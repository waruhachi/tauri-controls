import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import sveltePlugin from "eslint-plugin-svelte"
import globals from "globals"
import svelteParser from "svelte-eslint-parser"

export default [
  // Global ignores
  {
    ignores: [
      "**/.DS_Store",
      "**/node_modules/**",
      "build/**",
      ".svelte-kit/**",
      "package/**",
      "**/.env",
      "**/.env.*",
      "!**/.env.example",
      "**/.turbo/**",
      "**/pnpm-lock.yaml",
      "**/package-lock.json",
      "**/yarn.lock"
    ]
  },

  // Base JavaScript/TypeScript config
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: 2020,
      parserOptions: {
        extraFileExtensions: [".svelte"]
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslint
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules
    }
  },

  // Svelte-specific config
  ...sveltePlugin.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser
      }
    }
  }
]
