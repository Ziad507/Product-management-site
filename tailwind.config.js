/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "6rem", // Control the padding inside the container
      },
    },
  },
  plugins: [],
};

