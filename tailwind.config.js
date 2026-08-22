/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Remap the base "white" token to our dark ink color. Because the whole
        // component tree uses `text-white`, `bg-white/[0.0N]`, and `border-white/NN`
        // as its semantic "primary foreground / subtle overlay" utilities, this one
        // change turns every one of those into a correct dark-on-light treatment
        // (translucent dark tints for hover/glass surfaces, light gray hairline
        // borders, dark headline text) without touching ~70 component files.
        white: "#10131C",

        // Light "night" surface scale — page background lifts to elevated white
        // cards, following the Stripe/Linear/Notion light-mode convention of a
        // soft-gray page wash with pure-white elevated surfaces.
        night: {
          950: "#FFFFFF",
          900: "#F5F6FA",
          850: "#EEF0F6",
          800: "#E7EAF2",
          700: "#DDE1EC",
          600: "#C7CDDD",
          500: "#A7AFC4",
        },
        ink: {
          100: "#10131C",
          200: "#2A2E3D",
          300: "#454A5E",
          400: "#656B80",
          500: "#6E7488",
        },
        // Signature accents — deepened from their original dark-mode values so
        // they clear WCAG AA (4.5:1) as text/icon color on a white background.
        // The lighter historical values live on as `-soft` for fills/tints/glows.
        aurora: {
          DEFAULT: "#0B7D70",
          soft: "#2DD9C0",
          deep: "#08695E",
        },
        signal: {
          DEFAULT: "#4F46E5",
          soft: "#6E7CFF",
          deep: "#4338CA",
        },
        // AQI semantic scale — `DEFAULT` values stay vivid for fills, map markers,
        // chart lines, and low-alpha badge backgrounds. Each has a deepened `text`
        // pair (see src/data/aqiCategories.ts `textColor`) for anywhere the color
        // is rendered as literal text/icon foreground.
        aqi: {
          good: "#34D8A3",
          moderate: "#F5C84C",
          sensitive: "#F5924C",
          unhealthy: "#F0615F",
          veryUnhealthy: "#C084FC",
          hazardous: "#EF476F",
        },
        // Same six severities, deepened for AA-safe text/icon foreground use —
        // e.g. `text-aqiText-good` where `text-aqi-good` would fail contrast.
        aqiText: {
          good: "#067647",
          moderate: "#8A6200",
          sensitive: "#C2540D",
          unhealthy: "#C81E1E",
          veryUnhealthy: "#7C3AED",
          hazardous: "#B91C3D",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(45,217,192,0.10), transparent 45%), radial-gradient(circle at 80% 10%, rgba(110,124,255,0.10), transparent 40%)",
        "aurora-line": "linear-gradient(90deg, transparent, rgba(45,217,192,0.7), transparent)",
      },
      boxShadow: {
        glass: "0 1px 1px rgba(255,255,255,0.06) inset, 0 8px 30px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(45,217,192,0.15), 0 0 40px rgba(45,217,192,0.12)",
        "glow-violet": "0 0 0 1px rgba(110,124,255,0.15), 0 0 40px rgba(110,124,255,0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "sweep-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.55, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.04)" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "sweep-rotate": "sweep-rotate 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.8s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
