/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        toss: "#4880EE",
        background: "#F3F4F6",
        extraButton: "#EAF2FE",
        button: "#B2B8C0",
        yuno: "#90CBFF",
        black: "#1A1E27",
        userBlack: "#414141",
        red: "#DD5257",
        placeholder: "#B2B8C0",
      },
    },
    fontFamily: {
      PDBlack: ["PDBlack"],
      PDBold: ["PDBold"],
      PDExtraBold: ["PDExtraBold"],
      PDExtraLight: ["PDExtraLight"],
      PDLight: ["PDLight"],
      PDMedium: ["PDMedium"],
      PDRegular: ["PDRegular"],
      PDSemibold: ["PDSemibold"],
      PDThin: ["PDThin"],
    },
  },
  plugins: [],
};
