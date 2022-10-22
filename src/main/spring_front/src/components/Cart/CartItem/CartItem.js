import React, { useState } from "react";
import styles from "./CartItem.module.css";

import { connect } from "react-redux";
import {
  adjustQty,
  removeFromCart,
} from "./../../../services/actions/productActions";

const CartItem = ({ itemData, adjustQty, removeFromCart }) => {
  const [input, setInput] = useState(itemData.qty);
  console.log("", itemData.qty);

  const onChangeHandler = (e) => {
    let y = parseInt(e.target.value);
    setInput(e.target.value);
    adjustQty(itemData.id, y);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{itemData.name}</p>

        <p className={styles.details__price}>$ {itemData.price}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={itemData.qty}
            onChange={onChangeHandler}
          />
        </div>
        <button
          onClick={() => removeFromCart(itemData.id)}
          className={styles.actions__deleteItemBtn}
        >
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          />
        </button>
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
