import * as PT from "./productTypes";

const initialState = {
  product: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PT.SAVE_PRODUCT_REQUEST:
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

export default reducer;
