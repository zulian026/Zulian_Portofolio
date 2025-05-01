// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      content: [
        "./src/**/*.{js,ts,jsx,tsx}", // ini penting
        // tambahkan path lain jika perlu
      ],
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};
