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
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "next",
      "prettier"
    ]
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
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // 🔹 Reglas específicas de React
      "react/jsx-sort-props": [
        "error",
        { callbacksLast: true, shorthandFirst: true, noSortAlphabetically: true }
      ],

      // 🔹 Reglas específicas de TypeScript
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "react-hooks/exhaustive-deps": "off"
    }
  }
];

export default eslintConfig;
