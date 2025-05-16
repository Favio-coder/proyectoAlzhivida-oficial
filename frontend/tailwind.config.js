// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        'gray-custom': '#D9D9D9',
        'qinti-purple': '#6A1B9A'
      },
    },
  },
  plugins: [],
}
