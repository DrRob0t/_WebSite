/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // 🎨 HYVE DYNAMICS BRAND PALETTE
        hyve: {
          // Background (White Smoke) - Main backgrounds, clean sections
          background: "#F4F2F3",
          "background-dark": "#EDEAEB",
          
          // Content Sections (Columbia Blue) - Content blocks, cards
          content: "#CDE2E7",
          "content-dark": "#B8D4DA",
          
          // Accents (Moonstone) - Highlights, logo elements, CTAs
          accent: "#7FB3BE",
          "accent-dark": "#6A9AA4",
          "accent-light": "#94C7CE",
          
          // Interactive (Ocean Blue) - Gradient accents, interactive elements
          interactive: "#65a3b2", // #65a3b2
          "interactive-dark": "#028396", // #028396
          "interactive-light": "#02c1de", // #02c1de
          
          // Text/Interactive (Charcoal) - Body text, links, buttons
          text: "#3D4657",
          "text-dark": "#2D3543",
          "text-light": "#4D576A",
          
          // Headers (Gunmetal) - Main headings, strong emphasis
          header: "#2A303C",
          "header-light": "#3A404C",
        },
        
        // 🎯 SHADCN UI MAPPED TO HYVE BRAND
        border: "#CDE2E7",
        input: "#CDE2E7", 
        ring: "#7FB3BE",
        background: "#F4F2F3",
        foreground: "#2A303C",
        primary: {
          DEFAULT: "#3D4657",
          foreground: "#F4F2F3",
        },
        secondary: {
          DEFAULT: "#CDE2E7",
          foreground: "#2A303C",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#F4F2F3",
        },
        muted: {
          DEFAULT: "#CDE2E7",
          foreground: "#3D4657",
        },
        accent: {
          DEFAULT: "#7FB3BE",
          foreground: "#F4F2F3",
        },
        popover: {
          DEFAULT: "#F4F2F3",
          foreground: "#2A303C",
        },
        card: {
          DEFAULT: "#F4F2F3",
          foreground: "#2A303C",
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // 🔤 HYVE DYNAMICS CUSTOM FONTS
        'heading': ['Poppins', 'system-ui', 'sans-serif'], // Main headings, hero titles (using Poppins until custom font is available)
        'body': ['Poppins', 'system-ui', 'sans-serif'], // Body text, descriptions
        'sans': ['Poppins', 'system-ui', 'sans-serif'], // UI elements, navigation (using Poppins until custom font is available)
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'], // Code, technical specs
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'heading-1': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-2': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        'hyve': '0 4px 6px -1px rgba(42, 48, 60, 0.1), 0 2px 4px -1px rgba(42, 48, 60, 0.06)',
        'hyve-lg': '0 10px 15px -3px rgba(42, 48, 60, 0.1), 0 4px 6px -2px rgba(42, 48, 60, 0.05)',
        'hyve-xl': '0 20px 25px -5px rgba(42, 48, 60, 0.1), 0 10px 10px -5px rgba(42, 48, 60, 0.04)',
      },
      backgroundImage: {
        'gradient-hyve': 'linear-gradient(135deg, #F4F2F3 0%, #CDE2E7 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7FB3BE 0%, #3D4657 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2A303C 0%, #3D4657 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

