const preset = require('./templates/tailwind-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ['./templates/**/*.{ts,tsx}'],
};
