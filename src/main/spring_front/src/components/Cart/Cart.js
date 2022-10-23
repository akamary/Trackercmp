import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";

import { connect } from "react-redux";

import CartItem from "./CartItem/CartItem";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;
    let onlyNumbers = 0;

    cart.forEach((item) => {
      onlyNumbers = item.price.replace(
        /^(-)|[.,](?=[^.,]*[.,](?!$))|[,.]+$|[^0-9.,]+/g,
        "$1"
      );

      items += parseFloat(item.qty);
      price += item.qty * parseFloat(onlyNumbers);
    });
    setTotalPrice(parseFloat(price));
    setTotalItems(items);

    console.log(totalPrice);
  }, [cart, totalItems, setTotalItems, totalPrice, setTotalPrice]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map((item) => (
          <CartItem itemData={item} key={item.id} />
        ))}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} items)</span>
          <span>ILS {totalPrice}</span>
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
