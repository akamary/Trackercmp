import * as PT from "./productTypes";
import axios from "axios";

export const saveProduct = (product) => {
  return (dispatch) => {
    dispatch({
      type: PT.SAVE_PRODUCT_REQUEST,
    });
    axios
      .post("http://localhost:8080/rest/products", product)
      .then((response) => {
        dispatch(productSuccess(response.data));
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
  };
};

export const saveProductToUser = (productId, userId) => {
  return (dispatch) => {
    dispatch({
      type: PT.SAVE_PRODUCT_REQUEST,
    });
    axios
      .post(
        "http://localhost:8080/rest/products/" + productId + "/users/" + userId
      )
      .then((response) => {
        dispatch(productSuccess(response.data));
      })
      .catch((error) => {
        dispatch(productFailure(error));
      });
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

const productSuccess = (product) => {
  return {
    type: PT.PRODUCT_SUCCESS,
    payload: product,
  };
};

const productFailure = (error) => {
  return {
    type: PT.PRODUCT_FAILURE,
    payload: error,
  };
};
