import * as AT from "../types/authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/rest/user/authenticate";

export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      email: email,
      password: password,
    });
    console.log(JSON.stringify(response.data.id));
    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("id", response.data.id);
    dispatch(
      success({
        username: response.data.name,
        isLoggedIn: true,
        cart: response.data.cart,
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
    dispatch(success({ username: "", isLoggedIn: false, cart: "" }));
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

const success = (isLoggedIn, cart) => {
  return {
    type: AT.SUCCESS,
    payload: {
      isLoggedIn,
      cart,
    },
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
