import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EE",
        "paper-alt": "#EFE9DE",
        ink: "#221F1A",
        "ink-muted": "#8C8579",
        line: "#E3DDD1",
        accent: {
          DEFAULT: "#B8552E",
          deep: "#954627",
          tint: "#F3E3DA",
        },
        success: "#5B7A5E",
      },
      fontFamily: {
        serif: ["var(--font-caslon)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-work-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
