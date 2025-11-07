import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["'Hind Siliguri'", "sans-serif"],
        headline: ["'Hind Siliguri'", "sans-serif"],
        code: ["monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        lime: {
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          700: "#65a30d",
          800: "#4d7c0f",
          900: "#365314",
          950: "#1a2e05",
        },
        gray: {
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        red: {
          400: "#f87171",
          500: "#ef4444",
          700: "#b91c1c",
          900: "#450a0a",
          950: "#270707",
        },
        blue: {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          700: "#1d4ed8",
          900: "#1e3a8a",
          950: "#172554",
        },
        green: {
          400: "#4ade80",
          500: "#22c55e",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "marquee-infinite": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee-infinite": "marquee-infinite 60s linear infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in-from-top": "slide-in-from-top 0.5s ease-in-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.5s ease-in-out",
      },
      animationDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities, theme }: { addUtilities: any; theme: any }) {
      const newUtilities = {
        ".animation-delay-100": {
          "animation-delay": theme("animationDelay.100"),
        },
        ".animation-delay-200": {
          "animation-delay": theme("animationDelay.200"),
        },
        ".animation-delay-300": {
          "animation-delay": theme("animationDelay.300"),
        },
        ".animation-delay-400": {
          "animation-delay": theme("animationDelay.400"),
        },
        ".animation-delay-500": {
          "animation-delay": theme("animationDelay.500"),
        },
        ".animation-delay-600": {
          "animation-delay": theme("animationDelay.600"),
        },
        ".animation-delay-700": {
          "animation-delay": theme("animationDelay.700"),
        },
        ".animation-delay-800": {
          "animation-delay": theme("animationDelay.800"),
        },
        ".animation-delay-900": {
          "animation-delay": theme("animationDelay.900"),
        },
        ".animation-delay-1000": {
          "animation-delay": theme("animationDelay.1000"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;
