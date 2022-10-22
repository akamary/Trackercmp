import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { logoutUser } from "../services/index";
import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import "./User/backscreens.css";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import * as React from "react";
import Menu from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomRightRadius: "0%",
    borderBottomLeftRadius: "0%",
    headerOptions: {
      display: "flex",
      flex: 1,
      justifyContent: "space-evenly",
    },
  },
  buttons: {
    fontSize: "8",
  },
  title: {
    fontSize: 14,
  },
}));

const ABar = ({ cart }) => {
  const classes = useStyles();
  const [cartCount, setCartCount] = useState(0);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    let count = 0;
    cart.forEach((product) => {
      count += product.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Products Track and Compare
      </Typography>
      <Box fontSize={{ sm: 12 }}>
        <Toolbar>
          <Link to="/login">
            <LoginOutlinedIcon fontSize="small" color="inherit" />
            Login
          </Link>
          <Link to={"register"}>
            <PersonAddAltOutlinedIcon fontSize="small" color="inherit" />
            Register
          </Link>
        </Toolbar>
      </Box>
    </>
  );
  const userLinks = (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Products Track and Compare
      </Typography>
      <Box fontSize={{ sm: 12 }}>
        <Toolbar>
          <Link to={"home"}>
            <HomeIcon fontSize="small" color="inherit" />
            Home
          </Link>
          <Link to={"list"}>
            <Inventory2OutlinedIcon fontSize="small" color="inherit" />
            All Products
          </Link>
          <Link to="/cart">
            <IconButton color="inherit" aria-label="add to shopping cart">
              <AddShoppingCartIcon fontSize="small" color="inherit" />
              {cartCount}
            </IconButton>
          </Link>
          <Link to="/cart">
            <AddShoppingCartOutlinedIcon fontSize="small" color="inherit" />
            {cartCount} in Cart!
          </Link>

          <Link to={"login"} onClick={logout}>
            <LogoutOutlinedIcon fontSize="small" color="inherit" />
            Logout
          </Link>
        </Toolbar>
      </Box>
    </>
  );

  return (
    <AppBar position="sticky" className={classes.root} enableColorOnDark>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Link to={auth.isLoggedIn ? "home" : ""}></Link>
        {auth.isLoggedIn ? userLinks : guestLinks}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
  };
};

export default connect(mapStateToProps)(ABar);
