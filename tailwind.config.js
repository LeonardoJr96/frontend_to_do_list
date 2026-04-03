/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devops: {
          bg: '#0f172a',
          card: '#1e293b',
          primary: '#6366f1',
          success: '#22c55e',
          danger: '#ef4444'
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
      }
    },
  },
  plugins: [],
}
