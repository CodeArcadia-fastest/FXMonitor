module.exports = {
    darkMode: 'class',
    // ... other config
  }
  /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700', // Define a gold color
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(255, 215, 0, 0.7)' },
          '50%': { 'box-shadow': '0 0 0 10px rgba(255, 215, 0, 0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        pulseGold: 'pulseGold 2s infinite',
      },
    },
  }, 
  plugins: [],
}