// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/react/dist/**/*.{js,ts,jsx,tsx}",
    "\\\\\\\"./src/**/*.{js,ts,jsx,tsx}\\\\\\\" ,// Add this line if styles are inside `src`\\\\n    \\\\\\\"./src/pages/*.{js,ts,jsx,tsx}\\\\\\\"",
    "./node_modules/@nextui-org/theme/dist/components/(button|date-input|date-picker|divider|input|select|ripple|spinner|calendar|popover|listbox|scroll-shadow).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};