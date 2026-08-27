import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF1EA",
        "paper-alt": "#F3E4DC",
        ink: "#211A1D",
        "ink-muted": "#948581",
        "ink-soft": "#3A2E32",
        line: "#E6D9D2",
        "line-dark": "#3A2E32",
        accent: {
          DEFAULT: "#9E4256",
          deep: "#7A3243",
          tint: "#F0D9DC",
        },
        success: "#5B7A5E",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-body)", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
