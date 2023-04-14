const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        or: {
        "primary": "#ea580c",
        "secondary": "#3b82f6",
        "accent": "#fef08a",
        "neutral": "#e5e7eb",
        "base-100": "#ffffff",
        "info": "#1d4ed8",
        "success": "#22c55e",
        "warning": "#FBBD23",
        "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

module.exports = config;
