import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  user: userReducer,
});

export default rootReducer;
