/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
    theme: {
    extend: {},
  },
  plugins: [
      require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        customTheme: {
          "primary": "#f45c5c",
          "secondary": "#8499A7",
          "success": "#1BAFA2",
          "warning": "#FFF248",
          "danger": "#F37E89",
          "dark": "#0c2c54",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}

