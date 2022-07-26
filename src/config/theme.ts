import { orange, tomato, gray } from "@radix-ui/colors";

export const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    textSecondary: "rgba(0, 0, 0, 0.5)",
    textContainerTitle: "rgba(0, 0, 0, 0.66)",
    red: {
      700: "#E20912",
    },
    tomato: { ...tomato },
    orange: { ...orange },
    gray: { ...gray },
    neutral: {
      100: "#F7F7F7",
      200: "#E0E0E0",
    },
    button: { normal: "#ed6b47" },
  },
  font: {
    family: "Poppins",
    weigths: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
};
