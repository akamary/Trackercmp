import * as PT from "../types/productTypes";

const initialState = {
  products: [],
  currentItem: null,
  cart: [],
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PT.SAVE_PRODUCT_REQUEST:
      // get the items data from the products array
      const prod = action.payload;
      // checking if the item is in the user's cart
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
          : [...state.cart, { ...prod, qty: 1 }],
      };

    case PT.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +parseInt(action.payload.qty) }
            : item
        ),
      };
    case PT.GET_CART_REQUEST:
      return {
        ...state,
      };

    case PT.GET_CART_SUCCESS:
      return {
        ...state,
        cart: [action.payload],
      };
    case PT.GET_CART_FAILURE:
      return { ...state };
    case PT.UPDATE_PRODUCT_REQUEST:
      return { ...state, product: action.payload };
    case PT.DELETE_PRODUCT_REQUEST:
    case PT.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case PT.PRODUCT_SUCCESS:
      return {
        ...state,
        productId: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        error: "",
      };
    case PT.PRODUCT_FAILURE:
      return {
        product: "",
        error: action.payload,
      };
    case PT.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
