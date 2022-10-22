import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SUCCESS,
  FAILURE,
} from "./../types/authTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  username: "",
  isLoggedIn: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case FAILURE:
      return {
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
};

export default reducer;
