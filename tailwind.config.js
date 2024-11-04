/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'bounce-size': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)'
          },
          '50%': {
            transform: 'translateY(-50%) scale(1.5)'
          }
        }
      },
      animation: {
        'bounce-size': 'bounce-size 1.5s infinite ease-in-out'
      },
      screens: {
        'max-md': {
          max: '1300px'
        }
      }
    },
  },
  plugins: [],
};
