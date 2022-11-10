import React, { useEffect, useCallBack } from "react";
import styles from "./Cart.module.css";
import { connect, useDispatch } from "react-redux";
import { adjustQty, removeFromCart } from "./../../services/index";
import CartItem from "./cartItem/CartItem";


const EnumType = {
  REGEX: /^(-)|[.,](?=[^.,]*[.,](?!$))|[,.]+$|[^0-9.,]+/g,
};

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {}, []);
  const qtyChangeHandler = (item, quantity) => {
    dispatch(adjustQty(item, quantity));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cart.reduce((quantity, item) => Number(item.quantity) + quantity, 0);
  };

  const getCartSubTotal = () => {
    // return cart
    //   .reduce((price, item) => price + item.product.price * item.quantity, 0)
    //
    const total = getCartCount();
    console.log(total);
    if (cart) {
      let onlyNumbers = 0;
      let price = 0;

      cart.forEach((cartItem) => {
        if (cartItem.product.price) {
          onlyNumbers = cartItem.product.price.replace(EnumType.REGEX, "$1");
          price += parseFloat(cartItem.quantity) * parseFloat(onlyNumbers);
        } else if (cartItem.cart) {
          const inDB = cartItem.cart.data;

          if (inDB) {
            inDB.map(
              (item) => (
                (onlyNumbers = cartItem.product.price.replace(
                  EnumType.REGEX,
                  "$1"
                )),
                (price += parseFloat(item.quantity) * parseFloat(onlyNumbers))
              )
            );
          } else {
            cartItem.forEach((product) => {
              onlyNumbers = cartItem.product.price.replace(
                EnumType.REGEX,
                "$1"
              );
              price += parseFloat(product.quantity) * parseFloat(onlyNumbers);
            });
          }
          //items += parseFloat(cartItem.quantity);
          price += parseFloat(cartItem.quantity) * parseFloat(onlyNumbers);
        }
      });
      return price;
    }
  };
  return (
    <div>
      <div className={styles.cart}>
        
          <div className={styles.cart__items}>
            <h2>Cart</h2>

            {cart.map(
              (item) => (
                item.cart ? (cart = item.cart.data.cartItems) : (cart = item),
                cart.map((gg) => (
                  <CartItem
                    key={gg.product.id}
                    item={gg}
                    qtyChangeHandler={qtyChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))
              )
            )}
          </div>
        

        <div className={styles.container} id={styles.cart__sumary}>
          <h4 className={styles.summary__title}>Cart Summary</h4>
          <div className={styles.summary__price}>
            <span>Total items in cart: ({getCartCount()})</span>
            <span> {getCartSubTotal().toFixed(2)} ILS</span>
          </div>
          
          <button className={styles.summary__checkoutBtn}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
//   return (
//     <div>
//       <div className={styles.cart}>
//         <div className={styles.container}>
//           <div className={styles.cart__items}>
//             <h2>Cart</h2>

//             {cart.map(
//               (item) => (
//                 item.cart ? (cart = item.cart.data.cartItems) : (cart = item),
//                 cart.map((gg) => (
//                   <CartItem
//                     key={gg.product.id}
//                     item={gg}
//                     qtyChangeHandler={qtyChangeHandler}
//                     removeFromCartHandler={removeFromCartHandler}
//                   />
//                 ))
//               )
//             )}
//           </div>
//         </div>

//         <div className={styles.container} id={styles.cart__sumary}>
//           <h4 className={styles.summary__title}>Cart Summary</h4>
//           <div className={styles.summary__price}>
//             <span>Total items in cart: ({getCartCount()})</span>
//             <span> {getCartSubTotal().toFixed(2)} ILS</span>
//           </div>
//           .
//           <button className={styles.summary__checkoutBtn}>
//             Proceed To Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (item, value) => dispatch(adjustQty(item, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
