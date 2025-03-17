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
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: "#8647F0",
        lightPurple: "#F7F0FF",
        lightGray: "#8E8E93",
      },
      boxShadow: {
        "custom-1": "2px 4px 16px 0px rgba(0, 0, 0, 0.08)",
        "custom-2": "2px 4px 16px 0px rgba(0, 0, 0, 0.05)",
        "custom-purple": "2px 4px 16px 0px rgba(134, 71, 240, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
