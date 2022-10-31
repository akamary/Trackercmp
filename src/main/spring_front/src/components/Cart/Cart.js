import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { connect } from "react-redux";

import CartItem from "./cartItem/CartItem";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
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
  }, [cartItems, cart, totalItems, setTotalItems, totalPrice, setTotalPrice]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cartItems.map((itemData) => {
          return (
            itemData.cart
              ? (cartItems = itemData.cart.data)
              : (cartItems = itemData),
            cartItems.map((gg) => <CartItem item={gg} key={gg.id} />)
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

export default connect(mapStateToProps)(Cart);
