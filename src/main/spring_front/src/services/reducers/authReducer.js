import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SUCCESS,
  FAILURE,
} from "./../types/authTypes";

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
        isLoggedIn: false,
      };
    case SUCCESS:
      return {
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
