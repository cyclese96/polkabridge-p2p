import "./App.css";
import React from "react";
import theme from "./theme";
import { Fragment } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Appbar from "./common/Appbar";
import { Container } from "@mui/material";
import Profile from "./pages/Profile/Profile";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Container>
            <Appbar />
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Router>
          </Container>
        </Fragment>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
