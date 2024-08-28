/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#E88D67",         // Warm orange
        white: "#F3F7EC",      // Light greenish-gray
        lightBlue: "#006989",       // Medium teal-blue
        darkBlue: "#005C78",   // Darker teal-blue
      },
      fontFamily: {
        sans: ['Archivo Black', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
}
