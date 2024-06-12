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
        light: {
          primary: "#1069da",         // Primary Color -> Frames, Buttons, Links
          accent: "#ff595e",          // Accent Color -> Highlights, Buttons, Links
          tint: "#FDF9ED",            // Tint Color -> Some complemental elements background
          bg: {                       // Background Colors:
            screen: "#F9FAFB",        // Layour background -> light grey
            panels: "#ffffff",    // Components background -> white
            inverted: "#111827",      // Inverted background -> dark gray
          },
          font: {                     // Font Colors:
            primary: "#111827",       // Primary font color -> dark grey
            secondary: "#4b5563",     // Secondary font color -> less dark grey
            inverted: "#f3f4f6",      // Inverted font color -> very light grey
          }
        },
        dark: {
          primary: "#1069da",         // Primary Color -> Frames, Buttons, Links
          accent: "#ff595e",          // Accent Color -> Highlights, Buttons, Links
          tint: "#1a202c",            // Tint Color -> Some complemental elements background
          bg: {                       // Background Colors:
            screen: "#111827",        // Layour background -> dark grey
            panels: "#1F2937",        // Components background -> less dark grey
            inverted: "#F3F4F6",      // Inverted background -> very light grey
          },
          font: {                     // Font Colors:
            primary: "#F9FAFB",       // Primary font color -> very light grey
            secondary: "#D1D5DB",     // Secondary font color -> less light grey
            inverted: "#1F2937",      // Inverted font color -> dark grey
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
