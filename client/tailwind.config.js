/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'peru',
          // DEFAULT: '#6859b3',
          // DEFAULT: '#0078D4',
          dark: '#d9893b',
          // dark: '#584a9e',
          // dark: '#004578',
          light: '#c48547',
          // light: '#7c6ccc',
        },
        secondary: '#562B08',
        main: '#FAF5FF',
        accent: '#000',
        dark: {
          main: '#2f3640',
          accent: '#dcdde1',
        },
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class"
}