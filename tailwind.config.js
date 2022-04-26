module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/asset/Component.png')",
        'footer-pattern': "url('/asset/Logo.svg')",
      }
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100 )',
    }),
    minHeight: theme => ({
      '0': '0',
      ...theme('spacing'),
      full: '100%',
      screen : 'calc(var(--vh) * 100)',
    }),
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  methods: {
    setViewHeight: function() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
  mounted: function() {
    this.setViewHeight()
    window.addEventListener('resize', () => {
      this.setViewHeight()
    })
  },
}
