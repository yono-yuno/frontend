/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        toss: "#4880EE",
        background: "#F3F4F6",
        addbutton: "#EAF2FE",
        button: "#B2B8C0",
        charactor: "#B2B8C0",
        font: "#1A1E27",
        userFont: "#414141",
        red: "#DD5257",
        placeholder: "#B2B8C0",
      },
      fontFamily: {
        PDBlack: ["PdBlack"],
        PDBold: ["PDBold"],
        PDExtraBold: ["PDExtraBold"],
        PDExtraLight: ["PDExtraLight"],
        PDLight: ["PDLight"],
        PDMedium: ["PDMedium"],
        PDRegular: ["PDRegular"],
        PDSemiBold: ["PDSemiBold"],
        PDThin: ["PDThin"],
      },
      fontSize: {
        Button: "20px",
        placeholder: "15px",
        12: "12px",
        15: "15px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
      },
      borderRadius: {
        15: "15px",
      },
      borderWidth: {
        1.5: "1.5px",
      },
      spacing: {
        size: "371px",
        buttonsize: "351px",
      },
      variants: {
        backgroundcolor: ["focus"],
      },
    },
  },

  plugins: [],
};
