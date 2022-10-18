import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import productReducer from "./product/productReducer";
import cartReducer from "./product/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
