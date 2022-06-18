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
import { fromWei } from "../../utils/helper";

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
    fontSize: 22,
    letterSpacing: "0.02em",
  },
  subtitle: {
    color: "#414141",
    fontWeight: 400,
    fontSize: 14,
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
        await dispatch(getOrderDetailsById(order_id));
      }
    }
    asyncFn();
  }, [order_id]);

  useEffect(() => {
    console.log("order by id fetched", { order_id, order });
  }, [order]);

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
            <h4 variant="h4" color="textSecondary" className={classes.title}>
              Order Summary
            </h4>
          </Box>
          <div className={classes.infoCard}>
            <Typography
              variant="body2"
              color={"#212121"}
              fontSize={16}
              fontWeight={500}
            >
              Buy PBR with USDT
            </Typography>
            {order ? (
              <Grid container spacing={2} p={2}>
                <Grid item md={7} style={{ borderRight: "1px solid #e5e5e5" }}>
                  <div className="row">
                    <div className="col-md-6">
                      <Box mt={2}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={13}
                          color={"#778090"}
                        >
                          Price:
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#04A56D",
                              paddingLeft: 5,
                            }}
                          >
                            {order?.order_unit_price} {order?.fiat?.fiat}
                          </span>
                        </Typography>
                      </Box>

                      <Box mt={2}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={13}
                          color={"#778090"}
                        >
                          Payment Time Limit:
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              paddingLeft: 5,
                              color: "#212121",
                            }}
                          >
                            13:30-19:30 IST
                          </span>
                        </Typography>
                      </Box>
                    </div>
                    <div className="col-md-6">
                      <Box mt={2}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={13}
                          color={"#778090"}
                        >
                          Available:
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              paddingLeft: 5,
                              color: "#212121",
                            }}
                          >
                            {fromWei(
                              order?.order_amount,
                              order?.token?.decimals
                            )}
                            {" " + order?.token?.symbol}
                          </span>
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={13}
                          color={"#778090"}
                        >
                          Seller’s payment method:
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              paddingLeft: 5,
                              color: "#212121",
                            }}
                          >
                            {order?.payment_options?.toString()?.toUpperCase()}
                          </span>
                        </Typography>
                      </Box>{" "}
                    </div>
                  </div>
                  <div className="mt-5">
                    <Box mt={2}>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={14}
                        fontWeight={500}
                      >
                        Seller's Message:
                      </Typography>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={13}
                        pt={1}
                        color={"#778090"}
                      >
                        Please mark your payment withing time limit by only
                        given payments method.
                        {order && order.description
                          ? order.description
                          : "No message"}
                      </Typography>
                    </Box>
                  </div>
                  <div className="mt-5">
                    <Box mt={2}>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={14}
                        fontWeight={500}
                      >
                        Terms and conditions:
                      </Typography>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={13}
                        pt={1}
                        color={"#778090"}
                      >
                        DO NOT SEND PAYMENTS THROUGH THIRD PARTY ACCOUNTS, all
                        such payments will have to go to dispute and will be
                        refunded/cancelled. Please do not include crypto related
                        words such as P2P, Binance, USDT, ETH, BTC, etc. Send
                        INR through registered bank account only.
                      </Typography>
                    </Box>
                  </div>
                </Grid>
                <Grid item md={5}>
                  <Box mt={3}>
                    <Typography
                      textAlign="left"
                      variant="body2"
                      fontSize={15}
                      fontWeight={500}
                      color={"#76808F"}
                    >
                      I want to buy for:
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      mt={1}
                      style={{
                        border: "1px solid #bdbdbd",
                        borderRadius: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Input
                        fullWidth
                        disableUnderline
                        placeholder="1,000 - 21,483"
                        type="number"
                        value={amount}
                        onChange={(e) =>
                          handleAmountChange(
                            e.target.value,
                            fromWei(order?.order_amount, order?.token?.decimals)
                          )
                        }
                      />
                      <span style={{ color: "#212121", fontWeight: 600 }}>
                        {order?.fiat?.fiat}
                      </span>
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <Typography
                      textAlign="left"
                      variant="body2"
                      fontSize={15}
                      fontWeight={500}
                      color={"#76808F"}
                    >
                      I will get:
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      mt={1}
                      style={{
                        border: "1px solid #bdbdbd",
                        borderRadius: 4,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Input
                        fullWidth
                        type="text"
                        disableUnderline
                        placeholder="0.00"
                      />
                      <span
                        style={{
                          color: "#212121",
                          fontWeight: 500,
                        }}
                      >
                        PBR
                      </span>
                    </Box>
                  </Box>
                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      style={{
                        borderRadius: 7,
                        background: "#F5F5F5",

                        color: "black",
                        fontWeight: 600,
                        minWidth: 150,
                        marginRight: 5,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{
                        borderRadius: 7,
                        background: "#6A55EA",

                        color: "white",
                        minWidth: 200,
                        fontWeight: 600,
                        width: "100%",
                        marginLeft: 5,
                      }}
                    >
                      Buy PBR
                    </Button>
                    <Link to={`/order-payments/${order?._id}`}></Link>
                  </div>
                </Grid>
              </Grid>
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
