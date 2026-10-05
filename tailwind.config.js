/** @type {import('tailwindcss').Config} */
// Tokens extracted from rmfcn.com theme CSS (S0-3)
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(230 65% 15%)',
        card: 'hsl(0 0% 100%)',
        primary: { DEFAULT: 'hsl(348 83% 45%)', foreground: 'hsl(0 0% 100%)' },
        accent: { DEFAULT: 'hsl(230 65% 22%)', foreground: 'hsl(0 0% 100%)' },
        secondary: 'hsl(220 20% 96%)',
        muted: { DEFAULT: 'hsl(220 20% 96%)', foreground: 'hsl(230 15% 40%)' },
        destructive: 'hsl(0 84% 60%)',
        border: 'hsl(220 15% 90%)',
        cream: 'hsl(220 20% 98%)',
        // deep navy used by the hero, legacy and CTA so the dark sections read as one family
        ink: { DEFAULT: '#060a1c', soft: '#0b1233', line: 'rgba(255,255,255,0.12)' },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        display: ['Anton', 'Impact', 'sans-serif'], // bold, condensed: statements, numbers, hero,
        body: ['"Open Sans"', 'sans-serif'],
      },
      borderRadius: { md: '0.375rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem' },
    },
  },
  plugins: [],
}

