import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SUCCESS,
  FAILURE,
} from "./../types/authTypes";

const initialState = {
  username: "",
  isLoggedIn: "",
  cart: "",
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
        isLoggedIn: false,
        cart: "",
      };
    case SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
        cart: action.payload.cart,
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
