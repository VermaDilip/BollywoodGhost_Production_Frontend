
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'hero-gradient': 'linear-gradient(to right, rgb(24, 24, 24), rgb(24, 24, 24))',
//       },
//       colors: {
//         heading: "#ff4c60",
//         title_description: "#262626",
//       },
//       keyframes: {
//         'slide-in': {
//           '0%': { transform: 'translateX(-100%)' },
//           '100%': { transform: 'translateX(0)' },
//         },
//         'slide-out': {
//           '0%': { transform: 'translateX(0)' },
//           '100%': { transform: 'translateX(-100%)' },
//         },
//       },
//       animation: {
//         'slide-in': 'slide-in 0.3s ease-out forwards',
//         'slide-out': 'slide-out 0.3s ease-in forwards',
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, rgb(24, 24, 24), rgb(24, 24, 24))',
      },
      colors: {
        heading: "#ff4c60",
        title_description: "#262626",
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        // ✅ Modal specific animations (vertical)
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out-down': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(40px)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'slide-out': 'slide-out 0.3s ease-in forwards',
        // ✅ Modal animation classes
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'fade-out-down': 'fade-out-down 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
