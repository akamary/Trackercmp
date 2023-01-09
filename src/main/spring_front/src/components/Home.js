import React from "react";
import authToken from "../utils/authToken";
import Product from "./product/Product";
import "./Home.css";
import Banner from "./banner";
import Categories from "./categories";
import { Container, Grid } from "@mui/material";
import { getAllProduct } from "../services/index";
import { connect, useDispatch } from "react-redux";

const Home = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();
  dispatch(getAllProduct(userId));
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

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: (userId) => dispatch(getAllProduct(userId)),
  };
};
export default connect(null, mapDispatchToProps)(Home);
