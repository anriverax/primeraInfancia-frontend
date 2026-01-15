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
      },
      colors: {
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF"
        },
        success: {
          50: "#ECFDF5",
          100: "#DCFCE7",
          300: "#86EFAC",
          500: "#22C55E",
          600: "#16A34A"
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B"
        },
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444"
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E5E7EB",
          400: "#94A3B8",
          600: "#475569",
          800: "#0F172A"
        }
      }
    }
  },

  plugins: [heroui()]
};

export default config;
