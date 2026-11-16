import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chestnut: "#B26E2E",
        ochre: "#C4823F",
        "clavi-gold": "#D49A3D",
        espresso: "#171513",
        "espresso-soft": "#2A2724",
        vanilla: "#F6F1E7",
        buttermilk: "#ECE4D4",
        linen: "#FAF8F5",
        caramel: "#D4A055",
        porcelain: "#FFFFFF",
        forest: "#2C4334",
        "warm-border": "rgba(178, 110, 46, 0.16)",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      boxShadow: {
        "warm-card": "0 10px 40px -10px rgba(178, 110, 46, 0.12)",
        "elevation-hover": "0 20px 40px -15px rgba(23, 21, 19, 0.2)",
      },
      borderRadius: {
        "24": "24px",
        "240": "240px",
      },
    },
  },
  plugins: [],
};
export default config;
