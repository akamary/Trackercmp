import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";
import { Colors } from "../theme";

export const FooterTitle = styled(Typography)(() => ({
  textTransform: "uppercase",
  marginBottom: "1em",
}));

export const SubscribeTf = styled(TextField)(() => ({
  ".MuiInputLabel-root": {
    backgroundColor: "linear-gradient(#09587a,#191654)",
  },

  ".MuiInput-root::before": {
    borderBottom: "1px solid transperent",
     borderColor: "#09587a",
    
  },
}));
