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
import MyOrders from "./pages/MyOrders/MyOrders";
import CreateOrder from "./pages/Orders/CreateOrder";
import OrderPlaced from "./pages/Orders/OrderPlaced";
import Footer from "./common/Footer";
import OrderReview from "./pages/Orders/OrderReview";
import { Provider } from "react-redux";
import store from "./store";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Router>
              <Appbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-order" element={<CreateOrder />} />
                <Route path="/order-placed" element={<OrderPlaced />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/order-review" element={<OrderReview />} />
              </Routes>
              <Container>
                <Footer />
              </Container>
            </Router>
          </Fragment>
        </ThemeProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
