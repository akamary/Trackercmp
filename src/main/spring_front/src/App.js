import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/Product/ProductList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Home from "./components/Home";
import ABar from "./components/ABar";
import "./components/User/backscreens.css";
import { connect } from "react-redux";
import Cart from "./components/Cart/Cart";

const App = () => {
  // window.onbeforeunload = (event) => {
  //   const e = event || window.event;
  //   e.preventDefault();
  //   if (e) {
  //     e.returnValue = "";
  //   }
  //   return "";
  // };
  return (
    <Router>
      <ABar />

      <div className="App" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={() => <Login message="User Logged Out Successfully." />}
        />
      </Routes>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state.product.currentItem,
  };
};
export default connect(mapStateToProps)(App);
