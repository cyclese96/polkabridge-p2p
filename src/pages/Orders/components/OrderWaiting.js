import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useParams } from "react-router-dom";
import { CreditCard, MoneyOutlined } from "@mui/icons-material";
import HowItWorks from "../../../common/HowItWorks";
import { getOrderDetailsById } from "../../../actions/orderActions";
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
  paymentBox: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "60%",
    border: "1px solid #EAECEE",
    paddingTop: 30,
    padding: 20,
    borderRadius: 10,
    background: "linear-gradient(181.11deg, #FFFFFF -112.7%, #D9E8FC 233.13%)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pageTitle: {
    color: "#212121",
    fontWeight: 600,
    fontSize: 22,
    textAlign: "left",
    letterSpacing: "0.02em",
  },
  pageSubtitle: {
    color: "#414141",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "left",
  },
  title: {
    color: "#212121",
    fontWeight: 600,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: "0.02em",
  },
  description: {
    color: "#414141",
    fontWeight: 400,
    fontSize: 12,
    textAlign: "center",
  },
  subtitle: {
    color: "#414141",
    fontWeight: 600,
    fontSize: 16,
    textAlign: "center",
  },
  timer: {
    color: "#212121",
    fontWeight: 600,
    fontSize: 24,
    textAlign: "center",
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

function OrderWaiting() {
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
  const [orderComplete, setOrderComplete] = useState(true);

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
              className={classes.pageTitle}
            >
              Payments Page
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.pageSubtitle}
            >
              Waiting to settle your order
            </Typography>
          </Box>
          <div className={classes.infoCard}>
            <Typography variant="h4" classes={classes.cardTitle} align="center">
              Sell Order #{order?.order_id}
            </Typography>

            {order ? (
              <Container style={{ marginTop: 30 }}>
                <div className="d-flex justify-content-evenly">
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={3}
                    mb={5}
                  >
                    <Box
                      px={2}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-around"
                      alignItems="center"
                      width={200}
                    >
                      <div style={{ height: 100 }}>
                        <img
                          src="/images/choose_order.png"
                          style={{ height: 80 }}
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center mb-3 w-100">
                        <hr style={{ width: "100%" }} />
                        <div>
                          <div
                            style={{
                              backgroundColor: "#4caf50",
                              borderRadius: "50%",
                              height: 14,
                              width: 14,
                            }}
                          ></div>
                        </div>
                        <hr style={{ width: "100%" }} />
                      </div>
                      <h1 variant="h1" className={classes.title}>
                        Order Initiated
                      </h1>
                      <p variant="body2" className={classes.description}>
                        Your order is matched successfully
                      </p>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={3}
                    mb={5}
                  >
                    <Box
                      px={2}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-around"
                      alignItems="center"
                      width={200}
                    >
                      <div style={{ height: 100 }}>
                        <img
                          src="/images/order_start.png"
                          style={{ height: 80 }}
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center mb-3 w-100">
                        <hr style={{ width: "100%" }} />
                        <div>
                          <div
                            style={{
                              backgroundColor: "#4caf50",
                              borderRadius: "50%",
                              height: 14,
                              width: 14,
                            }}
                          ></div>
                        </div>
                        <hr style={{ width: "100%" }} />
                      </div>
                      <h1 variant="h1" className={classes.title}>
                        Payment Sent
                      </h1>
                      <p variant="body2" className={classes.description}>
                        Pay directly to seller bank account
                      </p>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={3}
                    mb={5}
                  >
                    <Box
                      px={2}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-around"
                      alignItems="center"
                      width={200}
                    >
                      <div style={{ height: 100 }}>
                        <img
                          src="/images/payment_add.png"
                          style={{ height: 80 }}
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center mb-3 w-100">
                        <hr style={{ width: "100%" }} />
                        <div>
                          <div
                            style={{
                              backgroundColor: "#4caf50",
                              borderRadius: "50%",
                              height: 14,
                              width: 14,
                            }}
                          ></div>
                        </div>
                        <hr style={{ width: "100%" }} />
                      </div>
                      <h1 variant="h1" className={classes.title}>
                        Waiting Seller
                      </h1>
                      <p variant="body2" className={classes.description}>
                        Let seller confirm your payment first
                      </p>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={3}
                    mb={5}
                  >
                    <Box
                      px={2}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-around"
                      alignItems="center"
                      width={200}
                    >
                      <div style={{ height: 100 }}>
                        <img
                          src="/images/order_finish.png"
                          style={{ height: 80 }}
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center mb-3 w-100">
                        <hr style={{ width: "100%" }} />
                        <div>
                          <div
                            style={{
                              backgroundColor: "#bdbdbd",
                              borderRadius: "50%",
                              height: 14,
                              width: 14,
                            }}
                          ></div>
                        </div>
                        <hr style={{ width: "100%" }} />
                      </div>
                      <h1 variant="h1" className={classes.title}>
                        Order Completed
                      </h1>
                      <p variant="body2" className={classes.description}>
                        Pay directly to seller bank account
                      </p>
                    </Box>
                  </Box>
                </div>

                <h6 className={classes.timer} style={{ marginTop: 30 }}>
                  {!orderComplete
                    ? "Waiting for seller to confirm your payment"
                    : "Fiat and Tokens P2P Transfer Finished"}
                </h6>
                <div className="text-center my-5">
                  <img src="/images/order_complete.png" height="150px" />
                </div>
                <h6
                  className={classes.description}
                  style={{ color: "#212121", fontSize: 14 }}
                >
                  {!orderComplete &&
                    "I have transferred exactly 50,000 to the above account."}
                </h6>
                <div className="text-center mt-4">
                  <Button
                    style={{
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "9px 35px 9px 35px",
                      color: "white",
                    }}
                  >
                    {!orderComplete
                      ? "View Payment Details"
                      : "Go To Trade Page"}
                  </Button>
                </div>
                <h6 className={classes.description} style={{ marginTop: 30 }}>
                  {orderComplete &&
                    "If have any issue regarding this trade, let us know in help section."}
                </h6>
              </Container>
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

export default OrderWaiting;
