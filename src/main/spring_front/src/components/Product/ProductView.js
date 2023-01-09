import React from "react";
import "./ProductView.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Typography, Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import {
  Productc,
  ProductImage,
  ProductAddToCart,
  ProductMetaWrapper,
  ProductActionsWrapper,
} from "./../../styles/product/";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductView = (current) => {
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.product.currentItem);
  const product = productDetails;
  useEffect(() => {});

  return (
    <div className="Productc">
      <>
        <div className="ProductImage">
          <div className="left__image">
            <img src={product.image} alt={product.name} width="250px" />
          </div>
          <div className="left__info">
            <p className="left__name">{product.name}</p>
            <p>Price: ${product.price}</p>
          </div>
        </div>
        <div className="productscreen__right">
          <div className="right__info">
            <p>
              Price:
              <span>{product.price}</span>
            </p>

            <p>
              <button type="button">Add To Cart</button>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    productObject: state.product,
    cart: state.product.cart,
    current: state.product.currentItem,
  };
};

export default connect(mapStateToProps)(ProductView);
