import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        /* dark editorial palette */
        carbon: {
          DEFAULT: "var(--bg)",
          raised: "var(--bg-raised)",
          glass: "rgba(5,5,5,0.78)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
        },
        ink: {
          DEFAULT: "var(--text)",
          muted: "var(--muted)",
          ghost: "rgba(237,237,237,0.04)",
          line: "rgba(237,237,237,0.14)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "rgba(237,237,237,0.16)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          dim: "var(--accent-dim)",
          faint: "rgba(198,255,74,0.35)",
          glow: "rgba(198,255,74,0.08)",
          foreground: "var(--accent-foreground)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          dim: "rgba(255,184,107,0.12)",
          faint: "rgba(255,184,107,0.35)",
        },

        /* shadcn/ui bridge — keeps Button / Input / Textarea / Toast on-brand */
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--surface-2)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ['"Inter Tight Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Inter Tight Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 3px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.65)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.26s cubic-bezier(0.33,1,0.68,1)",
        "accordion-up": "accordion-up 0.22s cubic-bezier(0.33,1,0.68,1)",
        "pulse-dot": "pulse-dot 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
