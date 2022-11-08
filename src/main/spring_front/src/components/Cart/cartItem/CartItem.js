import React, { useState } from "react";
import styles from "./CartItem.module.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect, useDispatch } from "react-redux";
import {
  adjustQty,
  removeFromCart,
  getAllProduct,
} from "./../../../services/index";
import { memo } from "react";

const CartItem = ({ cart, item, adjustQty, removeFromCart }) => {
  const [input, setInput] = useState(item.quantity);
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    dispatch(adjustQty(item, e.target.value));
  };

  return (
    <div>
      {
        <div className={styles.cartItem}>
          <img
            className={styles.cartItem__image}
            src={item.product.image}
            alt={item.product.name}
          />
          <div className={styles.cartItem__details}>
            <p className={styles.details__title}>{item.product.name}</p>
            <p className={styles.details__price}> {item.product.price} ILS</p>
          </div>
          <div className={styles.cartItem__actions}>
            <div className={styles.cartItem__qty}>
              <label htmlFor="quantity">Qty</label>
              <input
                min="1"
                type="number"
                id="quantity"
                name="quantity"
                value={input}
                onChange={onChangeHandler}
              />
            </div>
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon
                  fontSize="medium"
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className={styles.actions__deleteItemBtn}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (item, value) => dispatch(adjustQty(item, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    getAllProduct: (userId) => dispatch(getAllProduct(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
