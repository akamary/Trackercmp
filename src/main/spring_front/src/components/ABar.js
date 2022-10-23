import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logoutUser } from "../services/index";
import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import "./User/backscreens.css";
import { useState, useEffect } from "react";
import * as React from "react";
import { connect } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Stack from "@mui/material/Stack";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { fontSize } from "@mui/system";

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

      <Stack direction="row" spacing={1}>
        <Link to="/login">
          <Tooltip title="Login">
            <IconButton size="medium">
              <LoginRoundedIcon fontSize="medium" color="inherit" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to={"register"}>
          <Tooltip title="Register">
            <IconButton size="medium">
              <PersonAddTwoToneIcon fontSize="medium" color="inherit" />
            </IconButton>
          </Tooltip>
        </Link>
      </Stack>
    </>
  );
  const userLinks = (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Products Track and Compare
      </Typography>
      <Stack direction="row" spacing={1}>
        <Toolbar>
          <Link to={"home"}>
            <Tooltip title="Home">
              <IconButton size="medium">
                <HomeIcon fontSize="medium" color="inherit" />
              </IconButton>
            </Tooltip>
          </Link>

          <Link to={"list"}>
            <Tooltip title="Products">
              <IconButton size="medium">
                <FormatListBulletedIcon fontSize="medium" color="inherit" />
              </IconButton>
            </Tooltip>
          </Link>

          <Link to="/cart">
            <Tooltip title="Cart">
              <IconButton size="medium">
                <AddShoppingCartIcon fontSize="medium" />
                {cartCount}
              </IconButton>
            </Tooltip>
          </Link>

          <Link to={"login"} onClick={logout}>
            <Tooltip title="Logout">
              <IconButton size="medium">
                <LogoutOutlinedIcon fontSize="small" color="inherit" />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </Stack>
    </>
  );

  return (
    <AppBar
      position="sticky"
      className={classes.root}
      enableColorOnDark
      color="primary"
    >
      <Toolbar>
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
