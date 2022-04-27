import React from "react";
import { Box, Container, Button, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { border } from "@mui/system";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  linkItems: {
    paddingRight: 20,
    paddingTop: 7,
    fontWeight: 600,
    paddingLeft: 15,
    fontSize: 15,
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
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "7px 18px 7px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,
    "&:hover": {
      background: theme.palette.primary.hover,
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
            <Box display="flex" justifyContent="flex-start" alignItems="center">
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
                <Box display="flex" justifyContent="flex-start">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    {" "}
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
                  </Link>
                  <Link to="/create-order" style={{ textDecoration: "none" }}>
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
                  <Link to="/charts" style={{ textDecoration: "none" }}>
                    {" "}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.linkItems}
                      style={{
                        color: "black",
                      }}
                    >
                      Charts
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
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <div style={{ padding: 3, paddingRight: 10 }}>
                <Avatar src="https://mui.com/static/images/avatar/2.jpg" />{" "}
              </div>
              <div>
                <button className={classes.navbarButton}>
                  {window.innerWidth < 500 ? "Connect" : "Connect Wallet"}
                </button>
              </div>
            </Box>
          </Box>
        </Container>
      </header>
    </Box>
  );
};

export default Appbar;
