import "./Product.css";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import {
  Productc,
  ProductImage,
  ProductMetaWrapper,
} from "./../../styles/product/";
import Button from "@mui/material/Button";

const Product = ({ name }) => {
  const theme = useTheme();
  return (
    <Grid
      item
      container
      xs={3}
      sm={6}
      md={12}
      flexDirection={"column"}
      alignItems="center"
      sx={{
        [theme.breakpoints.up("md")]: {
          maxWidth: "250px",
        },
        [theme.breakpoints.down("md")]: {
          flexDirection: "row",
          alignItems: "center",
        },
      }}
    >
      <Productc
        sx={{
          height: "100%",
          width: "100%",
          [theme.breakpoints.up("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {name === "TV" && (
          <ProductImage src="https://www.lg.com/il/images/tv/md07539364/65QNED91VPA-L-01.jpg" />
        )}
        {name === "iPhone" && (
          <ProductImage src="https://www.apple.com/newsroom/images/product/iphone/geo/apple_iphone-12_new-design_geo_10132020.jpg.og.jpg?202208190304" />
        )}
        <ProductMetaWrapper>
          <Typography
            variant="h6"
            lineHeight={1.2}
            align="center"
            sx={{
              [theme.breakpoints.down("md")]: {
                fontSize: "11px",
                flexDirection: "column",
                alignItems: "center",
                padding: "2px",
              },
            }}
          >
            Show me {name} Stock!
          </Typography>
        </ProductMetaWrapper>

        <Button color="primary" variant="contained" >
          <Link style={{ textDecoration: "none" }} to={`/list`}>
            <Typography
              color={"white"}
              sx={{
                
                [theme.breakpoints.down("md")]: {
                  fontSize: "11px",
                },
              }}
            >
              View
            </Typography>
          </Link>
        </Button>
      </Productc>
    </Grid>
  );
};

export default Product;
