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
      main: "#212121",
      primary: "#212121",
      secondary: "#414141",
    },
    background: {
      main: "#6A55EA",
      light: "rgba(106, 85, 234,0.6)",
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
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Poppins",
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    h5: {
      fontFamily: "Poppins",
      fontSize: "1.0rem",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Poppins",
      fontSize: "0.75",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Poppins",
      fontSize: "1.125rem",
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: "0.02em",
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
