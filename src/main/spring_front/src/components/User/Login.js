import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginScreen.css";
import "./background.css";
import { authenticateUser } from "../../services/index";

const Login = (props) => {
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  let navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();

  const validateUser = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(user.email, user.password))
      .then((response) => {
        console.log(response.data);
        return navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
        navigate("/");
        setError("Invalid email and password");
      });
  };

  return (
    <div className="background-image">
      <div className="login-screen">
        <form onSubmit={validateUser} className="login-screen__form">
          <h3 className="login-screen__title">Sign in</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              required
              autoComplete="off"
              type="text"
              name="email"
              value={user.email}
              onChange={credentialChange}
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
              onChange={credentialChange}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
