import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./RegisterScreen.css";
import "./background.css";

import { registerUser } from "../../services/index";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
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
        console.log(error);
      });
  };

  const resetRegisterForm = () => {
    setUser(initialState);
  };

  return (
    <div className="background-image">
      <div className="register-screen">
        <form onSubmit={saveUser} className="register-screen__form">
          <h3 className="register-screen__title">Register</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              autoComplete="off"
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={userChange}
              placeholder="Enter Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input
              required
              autoComplete="off"
              type="text"
              name="email"
              value={user.email}
              onChange={userChange}
              placeholder="Enter Email Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              required
              autoComplete="off"
              type="password"
              name="password"
              value={user.password}
              onChange={userChange}
              placeholder="Enter Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">User Name:</label>
            <input
              required
              autoComplete="off"
              type="username"
              name="username"
              value={user.username}
              onChange={userChange}
              placeholder="Enter username"
            />
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
