import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./RegisterScreen.css";
import "./background.css";
import { Colors } from "./../../styles/theme/";
import { registerUser } from "../../services/index";
import { Button } from "@mui/material";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  let navigate = useNavigate();

  const initialState = {
    email: "",
    fullname: "",
    password: "",
    username: "",
  };

  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();

  const saveUser = (e) => {
    e.preventDefault();
    dispatch(registerUser(user))
      .then((response) => {
        setShow(true);
        setMessage(response.message);
        resetRegisterForm();
        setTimeout(() => {
          setShow(false);
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
        navigate("/");
        setError("Invalid email and password");
      });
  };

  const resetRegisterForm = () => {
    setUser(initialState);
  };

  return (
    <div id="wrapper">
      <div className="container">
        <h1>Register</h1>
        {error && <span className="error-message">{error}</span>}
        <form onSubmit={saveUser} className="form">
          <input
            required
            autoComplete="off"
            type="text"
            name="fullname"
            value={user.fullname}
            onChange={userChange}
            placeholder="Enter Full Name"
          />
          <input
            required
            autoComplete="off"
            type="text"
            name="email"
            value={user.email}
            onChange={userChange}
            placeholder="Enter Email Address"
          />

          <input
            required
            autoComplete="off"
            type="password"
            name="password"
            value={user.password}
            onChange={userChange}
            placeholder="Enter Password"
          />

          <input
            required
            autoComplete="off"
            type="password"
            name="password"
            value={user.password}
            onChange={userChange}
            placeholder="Enter password"
          />
          <Button
            type="submit"
            variant="outlined"
            style={{ borderRadius: 50, fontSize: "12px" }}
          >
            Register
          </Button>
          <span className="register-screen__subtext">
            Already have an account?{" "}
            <Link
              style={{ textDecoration: "none", color: Colors.white }}
              to="/login"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Register;
