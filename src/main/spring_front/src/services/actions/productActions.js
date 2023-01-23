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
        quantity: product.quantity,
      },
    });
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("jwtToken");
    const newQuantity = product.quantity ? product.quantity : 1;
    console.log("11");
    await axios
      .post(
        "http://localhost:8080/rest/cart/add",
        {
          userId: userId,
          productId: product.id,
          quantity: newQuantity,
          username: localStorage.getItem("username"),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      .then((response) => response.data)
      .then((data) => {
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
    const token = localStorage.getItem("jwtToken");
    await axios
      .delete("http://localhost:8080/rest/cart/" + userId + "/" + productId, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        id: item.product.id,
        quantity: value,
      },
    });
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("jwtToken");
    await axios
      .put(
        "http://localhost:8080/rest/cart/" + userId,
        {
          userId: userId,
          productId: item.product.id,
          quantity: value,
          username: localStorage.getItem("username"),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch(updateProductSuccess(data));
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
    const token = localStorage.getItem("jwtToken");
    await axios
      .get("http://localhost:8080/rest/cart/" + userId, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
