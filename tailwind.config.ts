import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#20231f",
        cream: "#f8f6f0",
        lemon: "#e5f65b",
        sage: "#e5eadf",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(32, 35, 31, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
