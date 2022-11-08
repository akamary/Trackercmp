//import "./CartIt.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./CartItem.module.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, qtyChangeHandler, removeFromCartHandler }) => {
  return (
    <div>
      {item ? (
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
                value={item.quantity}
                onChange={(e) => qtyChangeHandler(item, e.target.value)}
              />
            </div>
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon
                  fontSize="medium"
                  onClick={() => removeFromCartHandler(item.product.id)}
                  className={styles.actions__deleteItemBtn}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartItem;
