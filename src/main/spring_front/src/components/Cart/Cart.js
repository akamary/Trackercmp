import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { adjustQty, removeFromCart } from "./../../services/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [input, setInput] = useState(0);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setInput(parseInt(e.target.value));
    dispatch(adjustQty(e.target.id, parseInt(e.target.value)));
  };

  let cartItems = cart;
  useEffect(() => {
    let items = 0;
    let price = 0;
    let onlyNumbers = 0;
    if (cart) {
      cart.forEach((cartItem) => {
        if (cartItem.cart) {
          const inDB = cartItem.cart.data;
          if (inDB) {
            inDB.map(
              (item) => (
                (onlyNumbers = item.price.replace(
                  /^(-)|[.,](?=[^.,]*[.,](?!$))|[,.]+$|[^0-9.,]+/g,
                  "$1"
                )),
                (items += parseFloat(item.p_qty)),
                (price += parseFloat(item.p_qty) * parseFloat(onlyNumbers))
              )
            );
          } else {
            cartItem.forEach((product) => {
              onlyNumbers = product.price.replace(
                /^(-)|[.,](?=[^.,]*[.,](?!$))|[,.]+$|[^0-9.,]+/g,
                "$1"
              );
              items += parseFloat(product.qty);
              price += parseFloat(product.qty) * parseFloat(onlyNumbers);
            });
          }
        } else {
          onlyNumbers = cartItem.price.replace(
            /^(-)|[.,](?=[^.,]*[.,](?!$))|[,.]+$|[^0-9.,]+/g,
            "$1"
          );
          items += parseFloat(cartItem.qty);
          price += parseFloat(cartItem.qty) * parseFloat(onlyNumbers);
        }
      });
    }
    setTotalPrice(parseFloat(price));
    setTotalItems(items);
  }, [cart, totalItems, setTotalItems, totalPrice, setTotalPrice]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map((itemData) => {
          return (
            itemData.cart
              ? (cartItems = itemData.cart.data)
              : (cartItems = itemData),
            cartItems.map((gg) => {
              return (
                <div className={styles.cartItem}>
                  <img
                    className={styles.cartItem__image}
                    src={gg.image}
                    alt={gg.name}
                  />
                  <div className={styles.cartItem__details}>
                    <p className={styles.details__title}>{gg.name}</p>
                    <p className={styles.details__price}> {gg.price}</p>
                  </div>
                  <div className={styles.cartItem__actions}>
                    <div className={styles.cartItem__qty}>
                      <label htmlFor="p_qty">Qty</label>
                      <input
                        min="1"
                        type="number"
                        id="p_qty"
                        name="p_qty"
                        value={input === 0 ? gg.p_qty : input}
                        onChange={onChangeHandler}
                      />
                    </div>
                    <Tooltip title="Delete">
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          fontSize="medium"
                          onClick={() => dispatch(removeFromCart(gg.id))}
                          className={styles.actions__deleteItemBtn}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              );
            })
          );
        })}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} items)</span>
          <span> {parseFloat(totalPrice.toFixed(2))} ILS</span>
        </div>
        <button className={styles.summary__checkoutBtn}>
          Proceed To Checkout
        </button>
      </div>
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
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
//export default Cart;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
