import { Box, Container, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import { connect, useSelector } from "react-redux";

import { useUserAuthentication } from "../hooks/useUserAuthentication";
import {
  CONNECTOR_TYPE,
  GLOBAL_FIAT_LIST,
  GLOBAL_PAYMENT_OPTIONS,
  GLOBAL_TOKEN_LIST,
  NETWORK_TYPE,
  TOKENS,
} from "../constants";
import { useDispatch } from "react-redux";
import { useCurrencyBalance } from "../hooks/useBalance";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { formatCurrency, fromWei, setupNetwork } from "../utils/helper";
import { getUserProfile } from "../actions/profileActions";
import { ALL_SUPPORTED_CHAIN_IDS, NETWORK_DETAILS } from "../constants/chains";
import { GET_FIATS, GET_PAYMENTS, GET_TOKENS } from "../actions/types";

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

const Appbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [authStatus, connectWallet, verifyUserWallet] = useUserAuthentication();
  const loggedInUser = useSelector((state) => state?.user);

  const handleConnectWallet = useCallback(() => {
    connectWallet(CONNECTOR_TYPE.injected);
  }, [connectWallet]);

  // Common function calls required for frotend from backend

  // load all init data
  useEffect(() => {
    dispatch({
      type: GET_TOKENS,
      payload: GLOBAL_TOKEN_LIST[4],
    });

    dispatch({
      type: GET_FIATS,
      payload: GLOBAL_FIAT_LIST,
    });

    dispatch({ type: GET_PAYMENTS, payload: GLOBAL_PAYMENT_OPTIONS });

    if (!loggedInUser.account) {
      return;
    }

    dispatch(getUserProfile(loggedInUser?.account, loggedInUser?.jwtToken));
  }, [loggedInUser]);

  const { account, chainId, active } = useActiveWeb3React();
  const balance = useCurrencyBalance(account, TOKENS[4].ETH);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const cachedChain = localStorage.getItem("cachedChain");

    // console.log("chain changed ", { chainId, cachedChain });
    if (cachedChain && chainId?.toString() !== cachedChain) {
      localStorage.setItem("cachedChain", chainId?.toString());

      window.location.reload();
    } else if (!cachedChain) {
      localStorage.setItem("cachedChain", chainId?.toString());
    }
  }, [chainId, account, authStatus]);

  useEffect(() => {
    if (!account) {
      return;
    }
    const cachedAccount = localStorage.getItem("cachedAccount");

    // console.log("chain changed ", { account, cachedAccount });
    if (cachedAccount && account?.toString() !== cachedAccount) {
      localStorage.setItem("cachedAccount", account?.toString());

      window.location.reload();
    } else if (!cachedAccount) {
      localStorage.setItem("cachedAccount", account?.toString());
    }
  }, [account, authStatus]);

  const handleSwitchNetwork = useCallback(() => {
    setupNetwork(
      NETWORK_TYPE === 1 ? NETWORK_DETAILS.testnet : NETWORK_DETAILS.mainnet
    );
  }, [setupNetwork]);

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
                      {balance &&
                        formatCurrency(fromWei(balance?.toString(), 18)) +
                          "ETH"}
                    </span>{" "}
                    {account && (
                      <span className={classes.connectedAddress}>
                        {[...account].splice(0, 7)} {"..."}
                        {[...account].splice([...account].length - 7, 7)}
                      </span>
                    )}
                  </button>
                ) : (
                  <>
                    {active &&
                    !ALL_SUPPORTED_CHAIN_IDS.includes(parseInt(chainId)) ? (
                      <button
                        className={classes.navbarButton}
                        onClick={handleSwitchNetwork}
                      >
                        {window.innerWidth < 500
                          ? "Switch network"
                          : "Switch to mainnet"}
                      </button>
                    ) : (
                      <button
                        className={classes.navbarButton}
                        onClick={handleConnectWallet}
                      >
                        {window.innerWidth < 500 ? "Connect" : "Connect Wallet"}
                      </button>
                    )}
                  </>
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

export default connect(mapStateToProps, {})(Appbar);
