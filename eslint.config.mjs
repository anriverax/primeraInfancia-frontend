import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJs from "@eslint/js";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

const eslintConfig = [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules/**", "build/**", "dist/**", ".next/**"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname
      }
    }
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "prettier"]
  }),
  {
    plugins: {
      "unused-imports": pluginUnusedImports,
      react: pluginReact,
      "jsx-a11y": pluginJsxA11y,
      "@typescript-eslint": tseslint.plugin
    },
    rules: {
      // 🔹 Reglas base de JavaScript
      "no-console": "warn",
      "unused-imports/no-unused-imports": "error",
      // Desactivar no-unused-vars base (conflictúa con TypeScript)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // 🔹 Reglas específicas de React
      "react/jsx-sort-props": [
        "error",
        { callbacksLast: true, shorthandFirst: true, noSortAlphabetically: true }
      ],
      "react/react-in-jsx-scope": "off", // No necesario en Next.js con App Router

      // 🔹 Reglas específicas de TypeScript
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-explicit-any": "warn", // Advertir uso de any

      // 🔹 React Hooks - Rehabilitar con excepciones puntuales
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          // Permitir exclusiones específicas si es necesario
          // Por ahora, advertencia para revisar caso por caso
        }
      ]
    }
  }
];

export default eslintConfig;
