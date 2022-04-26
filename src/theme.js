import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let themes = createTheme({
  palette: {
    action: {
      disabled: "#bdbdbd",
      disabledBackground: "rgba(209, 255, 26, 0.3)",
    },
    primary: {
      main: "#6A55EA",
      hover: "rgba(70, 56, 160,1)",
    },
    text: {
      primary: "#212121",
      secondary: "#414141",
    },
    background: {
      main: "#6A55EA",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",
    h1: {
      fontFamily: "Poppins",
      fontSize: "3rem",
    },
    h2: {
      fontFamily: "Poppins",
      fontSize: "2.4rem",
    },
    h3: {
      fontFamily: "Poppins",
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "Poppins",
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Poppins",
      fontSize: "1.375rem",
      fontWeight: "normal",
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Poppins",
      fontSize: "1.125rem",
    },
    body2: {
      fontFamily: "Poppins",
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
