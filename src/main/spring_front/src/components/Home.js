import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import { Container } from "@material-ui/core";
import "./User/backscreens.css";

const Home = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (
    <div className="background-screens">
      <div className="App">
        <Container maxWidth="sm">
          <Alert
            style={{
              position: "fixed",
              textAlign: "center",
            }}
          >
            <h2>Welcome {auth.username}</h2>
            <h3>We are happy you come back!</h3>
          </Alert>
        </Container>
      </div>
    </div>
  );
};

export default Home;
