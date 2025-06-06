// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
      },
      spacing: {
        13: '3.25rem',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      fontFamily: {
        inter: ['Inter-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
