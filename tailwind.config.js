module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/asset/Component.png')",
        'footer-pattern': "url('/asset/Logo.svg')",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
