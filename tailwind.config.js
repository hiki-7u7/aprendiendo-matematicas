/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#0091FF",
        "light-green": "##4BDD2A",
        "dark-green": "#203432",
      },
    },
  },
  plugins: [],
};

// codigo para agregar el color #011626 en tailwind.config.js
// theme: {
//   extend: {
//     colors: {
//       "dark-blue": "#011626",
//     },
//   },

//   // ...
// },
