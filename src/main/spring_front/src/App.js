import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/Product/ProductList";
import ProductView from "./components/Product/ProductView";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Home from "./components/Home";
import ABar from "./components/ABar";
import { connect } from "react-redux";
import Cart from "./components/cart/Cart";
import { Container, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme/index.js";
import Footer from "./components/footer";
import { UIProvider } from "./components/context/ui";

const App = (current) => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container
          disableGutters
          maxWidth="100vw"
          sx={{
            background: "#fff",
          }}
        >
          <Stack>
            <UIProvider>
              <ABar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/home" element={<Home />} />
                <Route path="/list" element={<ProductList />} />
                <Route path="/list/product/:id" element={<ProductView />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/logout"
                  element={() => (
                    <Login message="User Logged Out Successfully." />
                  )}
                />
              </Routes>
              <Footer />
            </UIProvider>
          </Stack>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state.product.currentItem,
  };
};
export default connect(mapStateToProps)(App);
