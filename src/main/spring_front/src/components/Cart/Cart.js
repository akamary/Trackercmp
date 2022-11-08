import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { connect } from "react-redux";

import CartItem from "./cartItem/CartItem";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  let calcPrice = 0;
  console.log(calcPrice);
  useEffect(() => {
    let total = 0;
    calcPrice = 0;
    if (cart) {
      calcPrice = parseFloat(cart.totalCost);
      console.log(calcPrice);
      cart.forEach((cartItem) => {
        if (cartItem.cart) {
          calcPrice = parseFloat(cartItem.cart.data.totalCost);
          console.log(calcPrice);
          const inDB = cartItem.cart.data.cartItems;
          if (inDB) {
            calcPrice = parseFloat(cartItem.cart.data.totalCost);
            console.log(calcPrice);
            inDB.map((item) => (total += parseInt(item.quantity)));
          } else {
            calcPrice = parseFloat(cartItem.cart.data.totalCost);
            console.log(calcPrice);
            cartItem.forEach((product) => {
              total += parseInt(product.qty);
            });
          }
        } else {
          calcPrice = parseFloat(cart.totalCost);
          console.log(calcPrice);
          total += parseInt(cartItem.quantity);
        }
      });
    }
    setTotalPrice(parseFloat(calcPrice));
    setTotalItems(total);
  }, [cart, totalItems, setTotalItems, totalPrice, setTotalPrice]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map((itemData) => {
          return (
            itemData.cart
              ? (cart = itemData.cart.data.cartItems)
              : (cart = itemData),
            cart.map((gg) => <CartItem item={gg} key={gg.product.id} />)
          );
        })}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} items)</span>
          <span> {parseFloat(totalPrice.toFixed(2))} </span>
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
