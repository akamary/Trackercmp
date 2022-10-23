import * as PT from "../types/productTypes";
import axios from "axios";

export const saveProduct = (product) => {
  return (dispatch) => {
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
    axios
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
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
  };
};

export const removeFromCart = (productId) => {
  return {
    type: PT.REMOVE_FROM_CART,
    payload: {
      id: productId,
    },
  };
};

export const adjustQty = (productId, value) => {
  return {
    type: PT.ADJUST_QTY,
    payload: {
      id: productId,
      qty: value,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: PT.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const fetchProduct = (productId) => {
  return (dispatch) => {
    dispatch({
      type: PT.FETCH_PRODUCT_REQUEST,
    });
    axios
      .get("http://localhost:8080/rest/products/" + productId)
      .then((response) => {
        dispatch(productSuccess(response.data));
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
  };
};

export const updateProduct = (product) => {
  return (dispatch) => {
    dispatch({
      type: PT.UPDATE_PRODUCT_REQUEST,
    });
    axios
      .put("http://localhost:8080/rest/products", product)
      .then((response) => {
        dispatch(productSuccess(response.data));
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
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
