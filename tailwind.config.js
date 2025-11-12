const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Gradient classes
    'from-orange-500', 'via-orange-600', 'to-orange-700',
    'from-blue-500', 'via-blue-600', 'to-blue-700',
    'from-green-500', 'via-green-600', 'to-green-700',
    'from-purple-500', 'via-purple-600', 'to-purple-700',
    'from-teal-500', 'via-teal-600', 'to-teal-700',
    'from-indigo-500', 'via-indigo-600', 'to-indigo-700',
    // Border classes
    'border-orange-200', 'border-blue-200', 'border-green-200',
    'border-purple-200', 'border-teal-200', 'border-indigo-200',
    // Text classes
    'text-white', 'text-white/95', 'text-white/90',
    'text-orange-700', 'text-blue-700', 'text-green-700',
    'text-purple-700', 'text-teal-700', 'text-indigo-700',
    'text-gray-700', 'text-gray-400',
    // Background classes
    'bg-white', 'bg-white/90', 'bg-white/10',
    'bg-orange-50', 'bg-blue-50', 'bg-green-50',
    'bg-purple-50', 'bg-teal-50', 'bg-indigo-50',
    'bg-orange-500', 'bg-blue-500', 'bg-green-500',
    'bg-purple-500', 'bg-teal-500', 'bg-indigo-500',
    // Hover background classes
    'hover:bg-orange-50', 'hover:bg-blue-50', 'hover:bg-green-50',
    'hover:bg-purple-50', 'hover:bg-teal-50', 'hover:bg-indigo-50',
    // Hover text classes
    'hover:text-orange-600', 'hover:text-blue-600', 'hover:text-green-600',
    'hover:text-purple-600', 'hover:text-teal-600', 'hover:text-indigo-600',
    // Gradient from-to classes
    'from-orange-600', 'to-orange-700',
    'from-blue-600', 'to-blue-700',
    'from-green-600', 'to-green-700',
    'from-purple-600', 'to-purple-700',
    'from-teal-600', 'to-teal-700',
    'from-indigo-600', 'to-indigo-700',
    // Overlay classes
    'from-orange-600/10', 'from-blue-600/10', 'from-green-600/10',
    'from-purple-600/10', 'from-teal-600/10', 'from-indigo-600/10',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
