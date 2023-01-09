import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";

export const BannerContainer = styled(Box)(({  theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: "0px 0px",
  background: Colors.light_gray,

  [theme.breakpoints.down("md")]: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const BannerContent = styled(Box)((matches, theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 420,
  padding: "30px",
  alignItems: "center",
}));

export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "550px",
  height: "500px",
  [theme.breakpoints.down("md")]: {
    width: "350px",
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "320px",
    height: "300px",
  },
}));

export const BannerTitle = styled(Typography)(({  theme }) => ({
  lineHeight: 1.5,
  fontSize: "72px",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: "3em",
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: "1.5em",
    fontSize: "15px",
  },
}));

export const BannerShopButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
  name: "MyShopButton",
  slot: "Root",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && Colors.primary,
    props.color === "secondary" && Colors.primary,
  ],
})(({ theme }) => ({
  padding: "20px 0px",
  fontWeight: "bold",
  fontSize: "16px",
  width: "100%",
  background: "linear-gradient(45deg, #30cfd0 0%, #330867 100%)",
  [theme.breakpoints.down("md")]: {
    padding: "10px 0px",
    fontSize: "14px",
    
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0px",
    fontSize: "14px",
    width: "120px",
  },
}));
