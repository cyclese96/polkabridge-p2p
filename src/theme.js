import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let themes = createTheme({
  palette: {
    action: {
      disabled: "#bdbdbd",
      disabledBackground: "rgba(209, 255, 26, 0.3)",
    },
    primary: {
      // light: '#000000',
      main: "#D1FF1A",
      // dark: '#cccccc',
      contrastText: "#000000",
    },
    secondary: {
      // light: '#ffffff',
      main: "#000000",
      // dark: '#ffffff',
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    background: {
      default: "#F4F4F4",
      footerGrey: "#D7D7D7",
    },
    pink: {
      main: "#FF43CA",
      light: "#FFEAF9",
    },
    lightGreen: {
      main: "#E7FFDC",
    },

    columbiaBlue: {
      main: "#B0FFFA",
    },
    cyan: {
      main: "#2BFFF2",
    },
    onahauBlue: {
      main: "#C3FFFB",
    },
  },
  typography: {
    fontFamily: "Work Sans, Roboto, sans-serif",
    h1: {
      fontFamily: "Work Sans",
      fontSize: "2.813rem",
    },
    h2: {
      fontFamily: "Work Sans",
      fontSize: "2.1875rem",
    },
    h3: {
      fontFamily: "Work Sans",
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "Work Sans",
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "Work Sans",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Work Sans",
      fontSize: "1.375rem",
      fontWeight: "normal",
    },
    subtitle1: {
      fontFamily: "Work Sans",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Work Sans",
      fontSize: "1.125rem",
    },
    body2: {
      fontFamily: "Work Sans",
      fontSize: "1rem",
    },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920,
  //   },
  // },
});

let theme = responsiveFontSizes(themes);
export default theme;
