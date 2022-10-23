import React, { useState } from "react";
import styles from "./CartItem.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import {
  adjustQty,
  removeFromCart,
} from "./../../../services/actions/productActions";
import Tooltip from "@mui/material/Tooltip";

const CartItem = ({ itemData, adjustQty, removeFromCart }) => {
  const [input, setInput] = useState(itemData.qty);
  console.log("", itemData.qty);

  const onChangeHandler = (e) => {
    setInput(parseInt(e.target.value));
    adjustQty(itemData.id, parseInt(e.target.value));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{itemData.name}</p>

        <p className={styles.details__price}> {itemData.price}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon
              fontSize="medium"
              onClick={() => removeFromCart(itemData.id)}
              className={styles.actions__deleteItemBtn}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
