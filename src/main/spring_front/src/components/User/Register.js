import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.css";
import "./background.css";

import { registerUser } from "../../services/index";

const Register = (props) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const initialState = {
    username: "",
    email: "",
    fullname: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const dispatch = useDispatch;

  const saveUser = () => {
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
        console.log(error);
      });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password do not match");
    }
    saveUser();
  };
  const resetRegisterForm = () => {
    setUser(initialState);
  };

  return (
    <div className="background-image">
      <div className="register-screen">
        <form onSubmit={registerHandler} className="register-screen__form">
          <h3 className="register-screen__title">Register</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>

          <span className="register-screen__subtext">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
