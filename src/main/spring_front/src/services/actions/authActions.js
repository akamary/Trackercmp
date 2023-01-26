import * as AT from "../types/authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/rest/user/authenticate";

export const authenticateUser = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      username: username,
      password: password,
    });

    console.log(JSON.stringify(response.data.id));
    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("username", response.data.name);
    dispatch(
      success({
        username: response.data.name,
        isLoggedIn: true,
      })
    );
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("id");
    dispatch(success({ username: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (username, isLoggedIn, cart) => {
  return {
    type: AT.SUCCESS,
    payload: {
      username: username,
      isLoggedIn: isLoggedIn,
    },
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
