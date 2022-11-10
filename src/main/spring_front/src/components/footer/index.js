import {
  Grid,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Colors } from "../../styles/theme";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SubscribeTf, FooterTitle } from "../../styles/footer";
import SendIcon from "@mui/icons-material/Send";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

//* need to protect the routes here!!

export default function Footer() {
  return (
    <Box
      sx={{
        background: Colors.shaft,
        color: Colors.white,
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">About us</FooterTitle>
          <Typography variant="caption2">
            This shop Tracking Products and Comparing them
          </Typography>
          <Box
            sx={{
              mt: 4,
              color: Colors.dove_gray,
            }}
          >
            <a href="https://www.facebook.com/kamaryaviv/">
              <IconButton>
                <FacebookIcon sx={{ mr: 1 }} />
              </IconButton>
            </a>
            <a href="https://github.com/akamary">
              <IconButton>
                <GitHubIcon sx={{ mr: 1 }} />
              </IconButton>
            </a>
            <a href="https://www.linkedin.com/in/kamaryaviv/">
              <IconButton>
                <LinkedInIcon sx={{ mr: 1 }} />
              </IconButton>
            </a>
            <a href="https://www.instagram.com/kamaryaviv/">
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </a>
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                About Us
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Order Tracking
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">my account</FooterTitle>
          <List>
            <Link style={{ textDecoration: "none" }} to="/login">
              <ListItemButton>
                <Typography lineHeight={2} variant="caption2" color={"white"}>
                  Login
                </Typography>
              </ListItemButton>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/cart">
              <ListItemButton>
                <Typography lineHeight={2} variant="caption2" color={"white"}>
                  My Cart
                </Typography>
              </ListItemButton>
            </Link>

            <Link style={{ textDecoration: "none" }} to="/home">
              <ListItemButton>
                <Typography lineHeight={2} variant="caption2" color={"white"}>
                  My Account
                </Typography>
              </ListItemButton>
            </Link>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">newsletter</FooterTitle>
          <Stack>
            <SubscribeTf
              color="secondary"
              label="Email address"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white,  }} />}
              sx={{ mt: 4, mb: 4, background: "linear-gradient(#09587a,#191654)" }}
              variant="contained"
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
