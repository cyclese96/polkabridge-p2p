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
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useParams } from "react-router-dom";
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
import { getOrderDetailsById } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

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

function OrderSummary() {
  const classes = useStyles();
  const store = useSelector((state) => state);

  const theme = useTheme();
  const { order_id } = useParams();
  const dispatch = useDispatch();

  const { order } = store.order;

  //States
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState("BTC");
  const [payment, setPayment] = useState("Google Pay");

  useEffect(() => {
    async function asyncFn() {
      if (order_id) {
        console.log(order_id);
        let data = await dispatch(getOrderDetailsById(order_id));
        console.log(data);
      }
    }
    asyncFn();
  }, [order_id]);

  const handleAmountChange = (value, price) => {
    setAmount(value);

    let totalAmount = parseInt(price) * value;
    setTotal(totalAmount);
  };
  const handleTotalChange = (value, price) => {
    setTotal(value);

    let orderAmount = parseInt(price) / value;
    setAmount(orderAmount);
  };

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
              Order Summary
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.subtitle}
            >
              Choose you desired amount and proceed
            </Typography>
          </Box>
          <div className={classes.infoCard}>
            <Typography variant="h4" classes={classes.cardTitle} align="center">
              Proceed {order?.order_type} order
            </Typography>

            {order ? (
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="container row mt-5">
                      <div className="col-md-6">
                        <Box mt={2}>
                          <Typography textAlign="left" variant="body2">
                            Amount{" "}
                            {order.order_type === "sell" ? "on sell" : "to buy"}
                          </Typography>
                          <Typography
                            variant="body1"
                            align="left"
                            style={{ fontWeight: 600 }}
                          >
                            {Web3.utils.fromWei(
                              order.order_amount.toString(),
                              "ether"
                            )}
                            {" " + order.token.symbol}
                          </Typography>
                        </Box>
                      </div>
                      <div className="col-md-6">
                        {" "}
                        <Box mt={2}>
                          <Typography textAlign="left" variant="body2">
                            Price({order.fiat.fiat})
                          </Typography>
                          <Typography
                            variant="body1"
                            align="left"
                            style={{ fontWeight: 600 }}
                          >
                            {order.order_unit_price} per {order.token.symbol}
                          </Typography>
                        </Box>
                      </div>
                    </div>
                    <div className="container row mt-3">
                      <div className="col-md-6">
                        <Box mt={2}>
                          <Typography textAlign="left" variant="body2">
                            Payment Type
                          </Typography>
                          <Typography
                            variant="body1"
                            align="left"
                            style={{ fontWeight: 600 }}
                          >
                            {order.payment_options.toString().toUpperCase()}
                          </Typography>
                        </Box>
                      </div>
                      <div className="col-md-6">
                        <Box mt={2}>
                          <Typography
                            display="flex"
                            textAlign="left"
                            variant="body2"
                          >
                            Activity Time
                          </Typography>
                          <Typography
                            variant="body1"
                            align="left"
                            style={{ fontWeight: 600 }}
                          >
                            13:30-19:30 IST
                          </Typography>
                        </Box>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className=" mt-5">
                      <Box mt={2} style={{ width: "100%" }}>
                        <Typography
                          display="flex"
                          textAlign="left"
                          variant="body1"
                          style={{ fontWeight: 600 }}
                        >
                          Remarks:
                        </Typography>
                        <Box
                          style={{
                            border: "1px solid #e5e5e5",
                            borderRadius: 10,
                            padding: 10,
                            width: "100%",
                            minHeight: 150,
                          }}
                        >
                          <Typography
                            variant="body2"
                            textAlign="left"
                            style={{ fontWeight: 400 }}
                          >
                            {order.description}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Grid
                    container
                    mt={2}
                    display="flex"
                    justifyContent={"center"}
                    style={{ width: "70%" }}
                  >
                    <Grid item md={3} display="flex">
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
                          borderBottom: "1px solid #212121",
                          width: "fit-content",
                        }}
                      >
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) =>
                            handleAmountChange(
                              e.target.value,
                              Web3.utils.fromWei(
                                order.order_amount.toString(),
                                "ether"
                              )
                            )
                          }
                          disableUnderline={true}
                        />
                        {order.fiat.fiat}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    mt={2}
                    display="flex"
                    justifyContent={"center"}
                    style={{ width: "70%" }}
                  >
                    <Grid item md={3} display="flex">
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
                          borderBottom: "1px solid #212121",
                          width: "fit-content",
                        }}
                      >
                        <Input
                          type="number"
                          value={total}
                          onChange={(e) =>
                            handleTotalChange(
                              e.target.value,
                              Web3.utils.fromWei(
                                order.order_amount.toString(),
                                "ether"
                              )
                            )
                          }
                          disableUnderline={true}
                        />
                        INR
                      </Box>
                    </Grid>
                  </Grid>
                </div>
                <div className="text-center mt-4">
                  <Link to="/order-review">
                    <Button
                      style={{
                        borderRadius: 10,
                        background: "#6A55EA",
                        padding: "9px 35px 9px 35px",
                        color: "white",
                      }}
                    >
                      Confirm Buy
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              "Loading"
            )}
          </div>
          <HowItWorks />
        </Box>
      </Container>
    </Box>
  );
}

export default OrderSummary;
