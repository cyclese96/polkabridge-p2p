import { Box, Container, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import { connect } from "react-redux";
import { requestChalleng } from "../actions/userActions";

import { useUserAuthentication } from "../hooks/useUserAuthentication";
import { CONNECTOR_TYPE } from "../constants";
import { getAllFiats, getAllTokens } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

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
  connectedButton: {
    color: "white",
    padding: "7px 5px 7px 10px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  connectedAddress: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    padding: "4px 18px 4px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  numbers: {
    color: "#f9f9f9",
    fontSize: 14,
  },
}));

const Appbar = ({ requestChalleng }) => {
  const classes = useStyles();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [authStatus, connectWallet] = useUserAuthentication();

  const handleConnectWallet = useCallback(() => {
    connectWallet(CONNECTOR_TYPE.injected);
  }, [connectWallet]);

  // Common function calls required for frotend from backend

  useEffect(() => {
    dispatch(getAllTokens());
    dispatch(getAllFiats());
  }, []);

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
                      variant="h6"
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
                      variant="h6"
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
                      variant="h6"
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
                      variant="h6"
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
                      variant="h6"
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
                {authStatus?.authenticated ? (
                  <button onClick={null} className={classes.connectedButton}>
                    <span
                      style={{
                        color: "#212121",
                        height: "100%",
                        fontWeight: 600,

                        fontSize: 16,
                        letterSpacing: "-0.02em",
                        color: "#414141",
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      3.65 MATIC
                    </span>{" "}
                    <span className={classes.connectedAddress}>
                      0x98..32342
                    </span>
                  </button>
                ) : (
                  <button
                    className={classes.navbarButton}
                    onClick={handleConnectWallet}
                  >
                    {window.innerWidth < 500 ? "Connect" : "Connect Wallet"}
                  </button>
                )}
              </div>
            </Box>
          </Box>
        </Container>
      </header>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { requestChalleng })(Appbar);
