/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#D1D5DB',
        cream: '#F3F4F6',
        customYellow: '#FFFF99',
        customLime: '#A3E635',
        customTeal: '#2DD4BF',
        customCoral: '#FB7185',
        customPurple: '#A78BFA',
        darkGray: '#4B5563',
        olive: '#737373',
      },
    },
  },
  plugins: [],
}

