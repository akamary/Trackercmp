import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../theme";

export const CategoriesContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "30px 0px 30px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0px 20px 0px",
  overflow: "hidden",
  background: "linear-gradient(#09587a,#191654)",
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Aclonica", "sans-serif"',
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  color: Colors.white,
  fontSize: "1.5rem",
}));
