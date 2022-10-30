import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import Product from "./Product/Product";
import "./User/backscreens.css";
import "./Home.css";
import Banner from "./banner";
import Categories from "./categories";
import { Container, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../services/index";
import { connect } from "react-redux";

const Home = ({ cart }) => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();
  cart = dispatch(getAllProduct(userId));
  return (
    <>
      <Banner />
      <Categories />
      <Container>
        <Grid
          container
          justifyContent={"center"}
          spacing={{ xs: 2, md: 3 }}
          sx={{ margin: "20px 4px 10px 4px" }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Product name="TV" />
          <Product name="iPhone" />
        </Grid>
      </Container>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cart: state.product.cart.cart,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: (userId) => dispatch(getAllProduct(userId)),
  };
};
export default connect(null, mapDispatchToProps)(Home);
