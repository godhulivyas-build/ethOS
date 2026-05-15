import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-container": "#4b8eff",
        "surface-tint": "#adc6ff",
        "primary": "#adc6ff",
        "on-primary-container": "#00285c",
        "surface-dim": "#131313",
        "surface-variant": "#353534",
        "surface-bright": "#3a3939",
        "on-secondary": "#510074",
        "outline": "#8b90a0",
        "surface-container-lowest": "#0e0e0e",
        "on-error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#7c2e00",
        "on-secondary-fixed": "#310048",
        "on-background": "#e5e2e1",
        "on-primary": "#002e69",
        "tertiary-fixed-dim": "#ffb595",
        "inverse-on-surface": "#313030",
        "inverse-surface": "#e5e2e1",
        "on-primary-fixed-variant": "#004493",
        "surface-container-highest": "#353534",
        "tertiary": "#ffb595",
        "inverse-primary": "#005bc1",
        "secondary-fixed-dim": "#e9b3ff",
        "surface": "#131313",
        "secondary-container": "#7d01b1",
        "surface-container-low": "#1c1b1b",
        "error-container": "#93000a",
        "tertiary-container": "#ef6719",
        "secondary-fixed": "#f6d9ff",
        "on-secondary-fixed-variant": "#7200a3",
        "on-secondary-container": "#e5a9ff",
        "on-tertiary-container": "#4c1a00",
        "on-tertiary-fixed": "#351000",
        "secondary": "#e9b3ff",
        "on-primary-fixed": "#001a41",
        "on-surface-variant": "#c1c6d7",
        "on-surface": "#e5e2e1",
        "background": "#131313",
        "on-error": "#690005",
        "primary-fixed-dim": "#adc6ff",
        "tertiary-fixed": "#ffdbcc",
        "outline-variant": "#414755",
        "surface-container": "#201f1f",
        "on-tertiary": "#571e00",
        "surface-container-high": "#2a2a2a",
        "primary-fixed": "#d8e2ff",
        "error": "#ffb4ab"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "max-width-content": "1200px",
        "stack-md": "16px",
        "container-padding": "24px",
        "gutter": "16px",
        "stack-sm": "8px",
        "stack-lg": "32px",
        "unit": "4px"
      },
      fontFamily: {
        "body-md": ["Geist", "sans-serif"],
        "headline-md": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "headline-lg-mobile": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "label-mono": ["JetBrains Mono", "monospace"],
        "display-lg": ["Geist", "sans-serif"]
      },
      fontSize: {
        "body-md": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "headline-md": ["20px", { "lineHeight": "1.4", "fontWeight": "500" }],
        "body-lg": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500" }],
        "label-mono": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600" }]
      }
    },
  },
  plugins: [],
};
export default config;
