import "./App.css";
import React from "react";
import theme from "./theme";
import { Fragment } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
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
import OrderSummary from "./pages/Orders/OrderSummary";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Router>
            <Appbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order/:order_id" element={<OrderSummary />} />

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
    </Provider>
  );
}

export default App;
