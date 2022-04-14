import React from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { border } from "@mui/system";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  linkItems: {
    paddingRight: 20,
    paddingTop: 7,
  },
  logo: {
    height: 55,
  },
  paper: {
    top: "67px !important",
    left: "unset !important",
    right: "0 !important",
    width: "45%",
    borderRadius: "0",
    backgroundColor: "black",
    transformOrigin: "16px -1px !important",
  },
  listItem: {
    justifyContent: "center",
  },
  navbarButton: {
    background: "linear-gradient(to right, #E0077D,#E0077D)",
    color: "white",
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    fontWeight: 500,
    letterSpacing: 0.4,
    textTransform: "none",

    "&:hover": {
      background: "#C80C81",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
}));

const Appbar = () => {
  const classes = useStyles();

  return (
    <Box style={{ position: "relative", zIndex: 10 }}>
      <header>
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <a
              href="https://p2p.polkabridge.org"
              style={{ display: "flex", marginRight: "2rem" }}
            >
              <img
                src="/polkabridge.png"
                alt="PolkaBridge Logo"
                className={classes.logo}
              />
            </a>
            <Box>
              <Box display="flex">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.linkItems}
                  style={{
                    color: "black",
                  }}
                >
                  Home
                </Typography>
                <Link to="/create" style={{ textDecoration: "none" }}>
                  {" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: "black",
                    }}
                  >
                    Create Order
                  </Typography>
                </Link>
                <Link to="/my-orders" style={{ textDecoration: "none" }}>
                  {" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: "black",
                    }}
                  >
                    My Orders
                  </Typography>
                </Link>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.linkItems}
                    style={{
                      color: "black",
                    }}
                  >
                    Profile
                  </Typography>
                </Link>
                <div>
                  <Button
                    onClick={null}
                    // className={classes.navbarButton}
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#E0077D",
                      padding: "5px 15px 5px 15px",
                      marginRight: 7,
                      color: "white",
                    }}
                  >
                    {window.innerWidth < 500 ? "Connect" : "Connect Wallet"}
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={null}
                    // className={classes.navbarButton}
                    style={{
                      borderRadius: 10,
                      border: "1px solid #E0077D",
                      backgroundColor: "transparent",
                      padding: "5px 15px 5px 15px",
                      marginRight: 7,
                      color: "black",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                      height="10px"
                      style={{ paddingRight: 5 }}
                    />{" "}
                    India
                  </Button>
                </div>
              </Box>
            </Box>
          </Box>
        </Container>
      </header>
    </Box>
  );
};

export default Appbar;
