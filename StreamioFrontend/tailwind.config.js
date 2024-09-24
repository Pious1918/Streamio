/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'], // Add JetBrains Mono as the mono font
      },
    },
  },
  plugins: [],
}

