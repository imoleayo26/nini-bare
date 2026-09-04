import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "nb-white": "var(--nb-white)",
        "nb-blush": "var(--nb-blush)",
        "nb-pink": "var(--nb-pink)",
        "nb-rose": "var(--nb-rose)",
        "nb-berry": "var(--nb-berry)",
        "nb-ink": "var(--nb-ink)",
        "nb-gold": "var(--nb-gold)",
        "nb-border": "var(--nb-border)",
      },
    },
  },
  plugins: [],
};

export default config;
