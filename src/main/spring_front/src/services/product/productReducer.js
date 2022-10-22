import * as PT from "./productTypes";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PT.SAVE_PRODUCT_REQUEST:
      // get the items data from the products array
      const item = action.payload.product;

      // check if item is in cart alreardy
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case PT.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    case PT.FETCH_PRODUCT_REQUEST:
    case PT.UPDATE_PRODUCT_REQUEST:
    case PT.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
      };
    case PT.PRODUCT_SUCCESS:
      return {
        product: action.payload,
        error: "",
      };
    case PT.PRODUCT_FAILURE:
      return {
        product: "",
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
