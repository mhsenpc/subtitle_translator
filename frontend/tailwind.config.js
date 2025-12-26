/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#111827',
          card: '#1f2937',
          hover: '#374151',
        },
        primary: {
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        vazir: ['Vazir', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

