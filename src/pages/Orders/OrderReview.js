import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import {
  AccountBalanceWallet,
  AccountBalanceWalletOutlined,
  AttachMoney,
  CreditCard,
  History,
  List,
  ListOutlined,
  Money,
  MoneyOutlined,
  PriceChange,
} from "@mui/icons-material";
import HowItWorks from "../../common/HowItWorks";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
  },
  infoCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "100%",
    border: "1px solid #EAECEE",
    paddingTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: "#212121",
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: "0.02em",
  },
  subtitle: {
    color: "#414141",
    fontWeight: 400,
    fontSize: 16,
  },
  cardTitle: {
    textAlign: "center",
  },

  submitButton: {
    borderRadius: 10,
    backgroundColor: "#E0077D",
    padding: "5px 15px 5px 15px",
    color: "white",
  },
  orderTab: {
    backgroundColor: "#EEEEEE",
    padding: "5px 15px 5px 15px",
    fontWeight: 600,
    minWidth: 120,
    textAlign: "center",
  },
  orderTabSelected: {
    backgroundColor: "#DF097C",
    padding: "5px 15px 5px 15px",
    color: "white",
    fontWeight: 600,
    minWidth: 120,
    textAlign: "center",
  },
  tableCard: {
    width: "100%",
    height: "100%",
    border: "1px solid #eeeeee",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  table: {
    width: "100%",
  },
  tr: {
    width: "100%",
    height: 45,
  },
  userText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#DF097C",
  },
  otherText: {
    fontSize: 14,
    fontWeight: 400,
  },
  label: {
    color: "#616161",
    fontWeight: 500,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#E0077D",
    padding: "5px 15px 5px 15px",
    color: "white",
  },
  orderBox: {
    border: "1px solid #eeeeee",
    padding: 20,
    borderRadius: "30px",
  },
  para: {
    paddingTop: 10,
    color: "#757575",
    fontSize: 14,
  },
  iconTitle: {
    paddingTop: 20,
    color: "#333333",
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
  },
  iconSubtitle: {
    color: "#757575",
    fontSize: 14,
    textAlign: "center",
  },
  icon: {
    height: 50,
  },
  howTitle: {
    color: "#333333",
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
  },
  howSubtitle: {
    width: 600,
    color: "#757575",
    fontSize: 15,
    fontWeight: 400,
    textAlign: "center",
  },
}));

function OrderReview() {
  const classes = useStyles();
  const theme = useTheme();

  //States
  const [fiat, setFiat] = useState("INR");
  const [token, setToken] = useState("BTC");
  const [payment, setPayment] = useState("Google Pay");

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Box>
            <Typography
              variant="h3"
              color="textSecondary"
              className={classes.title}
            >
              Create Order
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.subtitle}
            >
              Create your order and get users in minutes
            </Typography>
          </Box>
          <div className={classes.infoCard}>
            <Typography variant="h4" classes={classes.cardTitle} align="center">
              Verify details and confirm your order
            </Typography>
            <div className="row align-items-center mt-5">
              <div className="col-md-6">
                <Box>
                  <Grid container>
                    <Grid item md={5} display="flex">
                      <Typography display="flex" alignItems={"center"}>
                        <ListOutlined
                          style={{ marginRight: 12, color: "#616161" }}
                        />{" "}
                        Order Type:
                      </Typography>
                    </Grid>
                    <Grid item md={7}>
                      <Typography
                        variant="body1"
                        align="left"
                        style={{ fontWeight: 600 }}
                      >
                        Sell Order
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container mt={2}>
                    <Grid item md={5} display="flex">
                      <Typography display="flex" alignItems={"center"}>
                        <AttachMoney
                          style={{ marginRight: 12, color: "#616161" }}
                        />{" "}
                        Price:
                      </Typography>
                    </Grid>
                    <Grid item md={7}>
                      <Box
                        display="flex"
                        alignItems={"center"}
                        style={{
                          width: "fit-content",
                        }}
                      >
                        <Typography
                          variant="body1"
                          align="left"
                          style={{ fontWeight: 600 }}
                        >
                          8
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container mt={2}>
                    <Grid item md={5} display="flex">
                      <Typography display="flex" alignItems={"center"}>
                        <MoneyOutlined
                          style={{ marginRight: 12, color: "#616161" }}
                        />{" "}
                        Amount:
                      </Typography>
                    </Grid>
                    <Grid item md={7}>
                      <Box
                        display="flex"
                        alignItems={"center"}
                        style={{
                          width: "fit-content",
                        }}
                      >
                        <Typography
                          variant="body1"
                          align="left"
                          style={{ fontWeight: 600 }}
                        >
                          3000 PBR
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container mt={2}>
                    <Grid item md={5} display="flex">
                      <Typography display="flex" alignItems={"center"}>
                        <CreditCard
                          style={{ marginRight: 12, color: "#616161" }}
                        />{" "}
                        Total:
                      </Typography>
                    </Grid>
                    <Grid item md={7}>
                      <Box
                        display="flex"
                        alignItems={"center"}
                        style={{
                          width: "fit-content",
                        }}
                      >
                        <Typography
                          variant="body1"
                          align="left"
                          style={{ fontWeight: 600 }}
                        >
                          24000 INR
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container mt={2}>
                    <Grid item md={5} display="flex">
                      <Typography display="flex" alignItems={"center"}>
                        <AccountBalanceWalletOutlined
                          style={{ marginRight: 12, color: "#616161" }}
                        />{" "}
                        Payment:
                      </Typography>
                    </Grid>
                    <Grid item md={7}>
                      <Box
                        display="flex"
                        alignItems={"center"}
                        style={{
                          width: "fit-content",
                        }}
                      >
                        <Box
                          style={{
                            backgroundColor: "#E1DCFF",
                            width: "fit-content",
                            padding: "5px 14px 5px 14px",

                            borderRadius: 7,
                            marginRight: 5,
                            fontSize: 14,
                          }}
                        >
                          UPI
                        </Box>
                        <Box
                          style={{
                            backgroundColor: "#E1DCFF",
                            width: "fit-content",
                            padding: "5px 14px 5px 14px",
                            borderRadius: 7,
                            marginRight: 5,
                            fontSize: 14,
                          }}
                        >
                          Google Pay
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="col-md-6">
                <Grid container mt={2}>
                  <Grid item md={5} display="flex">
                    <Typography display="flex" alignItems={"center"}>
                      <History style={{ marginRight: 12, color: "#616161" }} />{" "}
                      Activity Time:
                    </Typography>
                  </Grid>
                  <Grid item md={5}>
                    <Box
                      display="flex"
                      alignItems={"center"}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        align="left"
                        style={{ fontWeight: 600 }}
                      >
                        4 Hours
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    width: "80%",
                    marginTop: 30,
                  }}
                >
                  <Typography
                    variant="h5"
                    align="left"
                    style={{ marginBottom: 10 }}
                  >
                    Remark:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ marginBottom: 10, color: "#616161" }}
                  >
                    Please only put this order at the given time otherwise I
                    might be out and this order stuck.
                  </Typography>
                </Box>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link to="/order-placed">
                <Button
                  style={{
                    borderRadius: 10,
                    background: "#6A55EA",
                    padding: "9px 35px 9px 35px",
                    color: "white",
                  }}
                >
                  Confirm Order
                </Button>
              </Link>
            </div>
          </div>
          <HowItWorks />
        </Box>
      </Container>
    </Box>
  );
}

export default OrderReview;
