import * as PT from "../types/productTypes";
import axios from "axios";

const userId = localStorage.getItem("id");

//* saving to db
export const saveProduct = (product) => {
  return async (dispatch) => {
    dispatch({
      type: PT.SAVE_PRODUCT_REQUEST,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
    const userId = localStorage.getItem("id");
    await axios
      .post(
        "http://localhost:8080/rest/products/" + product.id + "/users/" + userId
      )

      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        const pricee = data.price.substring(4);
        data.price = pricee;
        console.log({ pricee });
        dispatch(productSuccess(data));
        dispatch(getAllProduct(userId));
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
  };
};

//* remove from cart all qty with p.id===productId
export const removeFromCart = (productId) => {
  return async (dispatch) => {
    dispatch({
      type: PT.REMOVE_FROM_CART,
      payload: {
        id: productId,
      },
    });
    const userId = localStorage.getItem("id");
    await axios
      .delete(
        "http://localhost:8080/rest/products/" + productId + "/users/" + userId
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch(getAllProduct(userId));
      })
      .catch((error) => {});
  };
};

export const adjustQty = (item, value) => {
  return async (dispatch) => {
    dispatch({
      type: PT.ADJUST_QTY,
      payload: {
        id: item.id,
        p_qty: value,
      },
    });
    const userId = localStorage.getItem("id");
    await axios
      .put("http://localhost:8080/rest/products/user/" + userId, {
        id: item.id,
        name: item.name,
        price: item.price,
        p_qty: value,
        image: item.image,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch(getAllProduct(userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loadCurrentItem = (product) => {
  return {
    type: PT.LOAD_CURRENT_ITEM,
    payload: product,
  };
};

export const getAllProduct = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: PT.GET_CART_REQUEST,
    });
    await axios
      .get("http://localhost:8080/rest/products/user/" + userId)
      .then((response) => response.data)
      .then((data) => {
        dispatch(cartSuccess({ data }));
      })
      .catch((error) => {
        dispatch(cartFailure(error));
      });
  };
};

export const cartSuccess = (data) => {
  return {
    type: PT.GET_CART_SUCCESS,
    payload: { cart: data },
  };
};
export const cartFailure = (response) => {
  return {
    type: PT.GET_CART_FAILURE,
  };
};
export const updateProductSuccess = (data) => {
  return {
    type: PT.UPDATE_PRODUCT_REQUEST,
    payload: data,
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    dispatch({
      type: PT.DELETE_PRODUCT_REQUEST,
    });
    axios
      .delete("http://localhost:8080/rest/products/" + productId)
      .then((response) => {
        dispatch(productSuccess(response.data));
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
  };
};

const productSuccess = (data) => {
  return {
    type: PT.PRODUCT_SUCCESS,
    payload: {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
    },
  };
};

const productFailure = (error) => {
  return {
    type: PT.PRODUCT_FAILURE,
    payload: error,
  };
};
