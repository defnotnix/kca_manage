export const configThemeMantineMain: any = {
  // * COLORS & SHADES
  colors: {
    brand: [
      "#eff5ff", // 50
      "#dbe8fe", // 100
      "#bed6ff", // 200
      "#92bdfe", // 300
      "#70a5fc", // 400
      "#3975f8", // 500
      "#2354ed", // 600
      "#1b40da", // 700
      "#1c35b1", // 800
      "#1d318b", // 900
    ],
  },
  primaryColor: "brand",
  primaryShade: {
    light: 6,
    dark: 5,
  },
  autoContrast: true,
  luminanceThreshold: 0.5,

  // white : "#ffffff"
  // black : "#000000"

  // * FONTS
  fontFamily: `"Host Grotesk", serif !important`,
  fontSmoothing: true,

  headings: {
    fontFamily: `"Host Grotesk", serif`,
    sizes: {
      h1: { fontSize: "36" },
    },
  },
};
