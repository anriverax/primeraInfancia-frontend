// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@anrivera/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "8px 8px 16px rgba(209, 217, 230, 0.8), -8px -8px 16px rgba(255, 255, 255, 0.9)"
      },
      backgroundImage: {
        "background-gradient": "linear-gradient(to bottom, #1e3a8a, #dbeafe)"
      }
    }
  },

  plugins: [heroui()]
};

export default config;
