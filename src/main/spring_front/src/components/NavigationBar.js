import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { logoutUser } from "../services/index";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <Nav className="navbar-right">
        <Link to={"register"} className="nav-link">
          Register
        </Link>
        <Link to={"login"} className="nav-link">
          Login
        </Link>
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        <Link to={"add"} className="nav-link">
          Add Product
        </Link>
        <Link to={"list"} className="nav-link">
          Product List
        </Link>
        <Link to={"users"} className="nav-link">
          User List
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout}>
          Logout
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
        Product Store
      </Link>
      {auth.isLoggedIn ? userLinks : guestLinks}
    </Navbar>
  );
};

export default NavigationBar;
