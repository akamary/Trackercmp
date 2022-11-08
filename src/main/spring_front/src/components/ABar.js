import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logoutUser, getAllProduct } from "../services/index";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  styled,
  Drawer,
} from "@mui/material";
import "./user/backscreens.css";
import { useState, useEffect } from "react";
import * as React from "react";
import { connect } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  AppbarContainer,
  AppbarHeader,
  MyList,
  ActionIconsContainerDesktop,
  DrawerCloseButton,
} from "./../styles/appbar";
import { Colors } from "./../styles/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { useUIContext } from "./../components/context/ui";
import CloseIcon from "@mui/icons-material/Close";
import { lighten } from "polished";
//import authToken from "../utils/authToken";

const MiddleDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;

const ABar = ({ cart }) => {
  // if (localStorage.jwtToken) {
  //   authToken(localStorage.jwtToken);
  // }
  const theme = useTheme();
  const [cartCount, setCartCount] = useState(0);
  const auth = useSelector((state) => state.auth);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { drawerOpen, setDrawerOpen } = useUIContext();
  const cartItemss = cart;

  useEffect(() => {
    let countInCart = 0;
    if (cart) {
      cart.forEach((cartItem) => {
        if (cartItem.cart) {
          const inDB = cartItem.cart.data.cartItems;
          if (inDB) {
            inDB.map((item) => (countInCart += parseInt(item.quantity)));
            setCartCount(parseInt(countInCart));
          }
        }
      });
    } else {
      setCartCount(0);
    }
  }, [cart, cartCount]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <MyList type="row">
      <Link to="/login">
        <Tooltip title="Login">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <LoginRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link to={"register"}>
        <Tooltip title="Register">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <PersonAddTwoToneIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" flexItem />
    </MyList>
  );
  const userLinks = (
    <MyList type="row">
      <Link to={"home"}>
        <Tooltip title="Home">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <HomeIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" flexItem />

      <Link to={"list"}>
        <Tooltip title="Products">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <FormatListBulletedIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" flexItem />

      <Link to={"cart"}>
        <Tooltip title="Cart">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <AddShoppingCartIcon />
              {cartCount}
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" flexItem />

      <Link to={"login"} onClick={logout}>
        <Tooltip title="Logout">
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" flexItem />
    </MyList>
  );
  const guestLinksMobile = (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        <List>
          <Link to="/login">
            <Tooltip title="Login">
              <ListItemButton>
                <ListItemIcon sx={{ color: Colors.secondary }}>
                  <LoginRoundedIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </Link>
          <MiddleDivider />

          <Link to={"register"}>
            <Tooltip title="Register">
              <ListItemButton>
                <ListItemIcon sx={{ color: Colors.secondary }}>
                  <PersonAddTwoToneIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </Link>
          <MiddleDivider />
        </List>
      </Drawer>
    </>
  );

  const userLinksMobile = (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        <List>
          <Link to={"home"}>
            <Tooltip title="Home">
              <ListItemButton>
                <ListItemIcon sx={{ color: Colors.secondary }}>
                  <HomeIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </Link>
          <MiddleDivider />

          <Link to={"list"}>
            <Tooltip title="Products">
              <ListItemButton>
                <ListItemIcon sx={{ color: Colors.secondary }}>
                  <FormatListBulletedIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </Link>
          <MiddleDivider />

          <Link to={"cart"}>
            <Tooltip title="Cart">
              <ListItemButton>
                <ListItemIcon sx={{ color: Colors.secondary }}>
                  <AddShoppingCartIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </Link>
          <MiddleDivider />

          <Link to={"login"} onClick={logout}>
            <Tooltip title="Logout">
              <ListItemButton>
                <ListItemIcon sx={{ color: Colors.secondary }}>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </Link>
          <MiddleDivider />
        </List>
      </Drawer>
    </>
  );
  return (
    <>
      {matches ? (
        <AppbarContainer>
          <AppbarHeader variant="h4">Products Track and Compare</AppbarHeader>
          <Link to={auth.username.isLoggedIn ? "home" : ""}></Link>
          {auth.username.isLoggedIn ? userLinksMobile : guestLinksMobile}
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </AppbarContainer>
      ) : (
        <AppbarContainer>
          <AppbarHeader variant="h4">Products Track and Compare</AppbarHeader>
          <ActionIconsContainerDesktop>
            <Link to={auth.username.isLoggedIn ? "home" : ""}></Link>
            {auth.username.isLoggedIn ? userLinks : guestLinks}
          </ActionIconsContainerDesktop>
        </AppbarContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    getAllProduct: (userId) => dispatch(getAllProduct(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ABar);
