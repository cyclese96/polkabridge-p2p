import { Box, Container, Button, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { border } from "@mui/system";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import connectors from "../connections/connectors";
import { connect } from "react-redux";
import { requestChalleng } from "../actions/userActions";
import axios from "axios";

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
  numbers: {
    color: "#f9f9f9",
    fontSize: 14,
  },
}));

const Appbar = ({ requestChalleng }) => {
  const classes = useStyles();

  const { active, deactivate, activate, account, library } =
    useActiveWeb3React();

  const handleWallet = useCallback(() => {
    console.log("wallet clickeed");
    activate(connectors.injected);
  }, [activate]);
  useEffect(() => {
    if (!account) {
      return;
    }

    async function signAndVerify() {
      let challengeRes = await axios.get(
        `http://localhost:5000/auth/${account?.toLowerCase()}`
      );
      challengeRes = challengeRes.data;
      const challenge = challengeRes?.[1]?.value;
      let signedMessage;
      try {
        signedMessage = await library.getSigner(0).signMessage(challenge);
      } catch (error) {
        console.log("signed message error ", error);
      }

      if (!signedMessage) {
        return;
      }

      const verify = await axios.get(
        `http://localhost:5000/auth/${challenge}/${signedMessage}`
      );

      console.log("user verified ", { signedMessage, challenge, verify });
    }
    signAndVerify();
  }, [account]);

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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { requestChalleng })(Appbar);
