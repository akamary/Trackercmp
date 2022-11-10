import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BannerContainer>
      <BannerImage
        src="https://www.kindpng.com/picc/m/140-1404282_used-computers-2-compressor-materiel-informatique-hd-png.png"
        alt=""
      />
      <BannerContent>
        <Typography variant="h6">Huge Collection</Typography>
        <BannerTitle variant="h2">New Products</BannerTitle>

        <BannerDescription variant="subtitle">
          Hello Dear Customer, Shop the new collection right now !
        </BannerDescription>

        <BannerShopButton color="secondary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
