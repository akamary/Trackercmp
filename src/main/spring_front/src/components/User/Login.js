import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginScreen.css";
import "./background.css";
import { authenticateUser } from "../../services/index";
import PersonIcon from "@mui/icons-material/Person";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const { name } = useParams();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
  };

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

  const validateUser = () => {
    dispatch(authenticateUser(user.email, user.password))
      .then((response) => {
        console.log(response.data);
        return props.history.push("/home");
      })
      .catch((error) => {
        console.log(error.message);
        setShow(true);
        resetLoginForm();
        setError("Invalid email and password");
      });
  };

  const resetLoginForm = () => {
    setUser(initialState);
  };

  return (
    <div className="background-image">
      <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
          <h3 className="login-screen__title">Sign in</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              startIcon={<PersonIcon />}
              type="text"
              required
              id="name"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={validateUser}
          >
            Sign in
          </button>
          <span className="login-screen__subtext">
            Don't have an account? <Link to="/register">Sign up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
