module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ee',
          100: '#f9edcb',
          200: '#f2d88e',
          300: '#e8bf52',
          400: '#d4a843',
          500: '#c09030',
          600: '#a37620',
          700: '#7f5c18',
          800: '#5e4414',
          900: '#3d2d0d',
        },
        stone: {
          50:  '#fafaf8',
          100: '#f5f3ef',
          150: '#eeeae3',
          200: '#e6e1d8',
          300: '#d4cdc0',
          400: '#b8ae9e',
          500: '#998e7c',
          600: '#7a6f5f',
          700: '#5e5649',
          800: '#3f3a31',
          900: '#1c1815',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}
