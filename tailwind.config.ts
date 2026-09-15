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
        chestnut: "#864C31",
        espresso: "#222222",
        vanilla: "#FEF8DD",
        buttermilk: "#F7EEC8",
        linen: "#FAF7F2",
        caramel: "#D4A055",
        porcelain: "#FFFFFF",
        "warm-border": "rgba(134, 76, 49, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      boxShadow: {
        'warm-card': '0 10px 40px -10px rgba(134, 76, 49, 0.08)',
      },
      borderRadius: {
        '24': '24px',
        '240': '240px',
      }
    },
  },
  plugins: [],
};
export default config;
