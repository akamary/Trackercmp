import "./Product.css";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";
import {
  Productc,
  ProductImage,
  ProductAddToCart,
  ProductMetaWrapper,
  ProductActionsWrapper,
} from "./../../styles/product/";
import Button from "@mui/material/Button";
import { Colors } from "./../../styles/theme";

const Product = ({ name }) => {
  const theme = useTheme();
  return (
    <Grid
      item
      container
      xs={2}
      sm={4}
      md={4}
      flexDirection={"column"}
      alignItems="center"
    >
      <Productc
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        {name === "TV" && (
          <ProductImage src="https://www.lg.com/il/images/tv/md07539364/65QNED91VPA-L-01.jpg" />
        )}
        {name === "iPhone" && (
          <ProductImage src="https://www.apple.com/newsroom/images/product/iphone/geo/apple_iphone-12_new-design_geo_10132020.jpg.og.jpg?202208190304" />
        )}
        <ProductMetaWrapper>
          <Typography variant="h6" lineHeight={3}>
            Show me {name} Stock!
          </Typography>
        </ProductMetaWrapper>

        <Button color="secondary" variant="contained">
          <Link style={{ textDecoration: "none" }} to={`/list`}>
            <Typography color={"white"}>View</Typography>
          </Link>
        </Button>
      </Productc>
    </Grid>
  );
};

export default Product;
