import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import react from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import globals from "globals"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {},
    },

    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
      )
    ),

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react: fixupPluginRules(react),
    },

    rules: {
      "react/jsx-key": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": 0,
    },
  },
])
