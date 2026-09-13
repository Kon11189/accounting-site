import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF9F5",
        "ivory-soft": "#F4F0E8",
        surface: "#FFFFFF",
        ink: "#101316",
        graphite: "#2C3138",
        muted: "#565C64",
        line: "rgba(21,23,28,0.12)",
        "line-strong": "rgba(21,23,28,0.18)",
        forest: {
          DEFAULT: "#123025",
          light: "#1C4636",
          soft: "#E6EDE9",
        },
        gold: {
          DEFAULT: "#9A7828",
          soft: "#F2EBD9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(21,23,28,0.04), 0 8px 24px rgba(21,23,28,0.06)",
        card: "0 1px 3px rgba(21,23,28,0.05), 0 16px 40px rgba(21,23,28,0.08)",
        float: "0 12px 40px rgba(21,23,28,0.14)",
        glow: "0 0 0 1px rgba(20,53,43,0.06), 0 20px 50px rgba(20,53,43,0.12)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
