/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundColor:{
        primary: "#FF9100",
      },
      fontFamily: {
        primaryRegular: ["NotoSansRegular", "sans-serif"],
        primaryBlack: ["NotoSansBlack", "sans-serif"],
        primaryBlackItalic: ["NotoSansBlackItalic", "sans-serif"],
        primaryBold: ["NotoSansBold", "sans-serif"],
        primaryBoldItalic: ["NotoSansBoldItalic", "sans-serif"],
        primaryExtraBold: ["NotoSansExtraBold", "sans-serif"],
        primaryExtraBoldItalic: ["NotoSansExtraBoldItalic", "sans-serif"],
        primaryExtraLight: ["NotoSansExtraLight", "sans-serif"],
        primaryExtraLightItalic: ["NotoSansExtraLightItalic", "sans-serif"],
        primaryItalic: ["NotoSansItalic", "sans-serif"],
        primaryLight: ["NotoSansLight", "sans-serif"],
        primaryLightItalic: ["NotoSansLightItalic", "sans-serif"],
        primaryMedium: ["NotoSansMedium", "sans-serif"],
        primaryMediumItalic: ["NotoSansMediumItalic", "sans-serif"],
        primarySemiBold: ["NotoSansSemiBold", "sans-serif"],
        primarySemiBoldItalic: ["NotoSansSemiBoldItalic", "sans-serif"],
        primaryThin: ["NotoSansThin", "sans-serif"],
        primaryThinItalic: ["NotoSansThinItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
