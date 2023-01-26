import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginScreen.css";
import { authenticateUser } from "../../services/index";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { Colors } from "./../../styles/theme/";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";

const Login = (props) => {
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  let navigate = useNavigate();

  const initialState = {
    username: "",
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
    dispatch(authenticateUser(user.username, user.password))
      .then((response) => {
        console.log(response.data);
        return navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
        navigate("/");
        setError("Invalid username and password");
      });
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(Colors.white),
    backgroundColor: Colors.primary[500],
    "&:hover": {
      backgroundColor: Colors.primary[700],
    },
  }));
  return (
    <div id="wrapper">
      <div className="container">
        <h1>Sign in</h1>
        {error && <span className="error-message">{error}</span>}
        <form onSubmit={validateUser} className="form">
          <input
            required
            autoComplete="off"
            type="text"
            name="username"
            value={user.username}
            onChange={credentialChange}
            placeholder="Username"
          />

          <input
            required
            autoComplete="off"
            type="password"
            name="password"
            value={user.password}
            onChange={credentialChange}
            placeholder="Password"
          />
          <Button
            type="submit"
            variant="outlined"
            style={{
              borderRadius: 50,
              fontSize: "12px",
              height: "30px",
              padding: 12,
            }}
          >
            Sign in
          </Button>

          <span className="login-screen__subtext">
            Don't have an account?{" "}
            <Link
              style={{ textDecoration: "none", color: Colors.secondary }}
              to="/register"
            >
              Sign up
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

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (username, password) =>
      dispatch(authenticateUser(username, password)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
