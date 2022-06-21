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
import HowItWorks from "../../../common/HowItWorks";
import { getOrderDetailsById } from "../../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { fromWei } from "../../../utils/helper";

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
  paymentCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "100%",
    maxWidth: 700,
    border: "1px solid #EAECEE",
    paddingTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  chatCard: {
    marginTop: 20,
    marginBottom: 20,
    height: 500,
    width: "100%",
    maxWidth: 700,
    border: "1px solid #EAECEE",

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
              Order Processing
            </h4>
          </Box>
          <Box display={"flex"} justifyContent="space-between">
            <Box display={"flex"} justifyContent="start" mt={1}>
              <Box pr={1}>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#04A56D",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    1.
                  </div>{" "}
                  <div
                    style={{
                      borderTop: "1px dotted #212121",
                      width: "80%",
                      height: 1,
                      marginLeft: 5,
                      minWidth: 170,
                    }}
                  ></div>
                </div>{" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  mt={1}
                >
                  Transfer Payment to seller
                </Typography>
              </Box>
              <Box pr={1}>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#bdbdbd",
                      color: "black",
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    2.
                  </div>{" "}
                  <div
                    style={{
                      borderTop: "1px dotted #212121",
                      width: "80%",
                      height: 1,
                      marginLeft: 5,
                      minWidth: 170,
                    }}
                  ></div>
                </div>{" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  mt={1}
                  color={"#919191"}
                >
                  Pending seller confirmation
                </Typography>
              </Box>
              <Box pr={1}>
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#bdbdbd",
                      color: "black",
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    3.
                  </div>{" "}
                  <div
                    style={{
                      borderTop: "1px dotted #212121",
                      width: "80%",
                      height: 1,
                      marginLeft: 5,
                      minWidth: 170,
                    }}
                  ></div>
                </div>{" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  fontSize={14}
                  fontWeight={500}
                  mt={1}
                >
                  Completed
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={13}
                color={"#778090"}
              >
                Order Number:
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#212121",
                    paddingLeft: 5,
                  }}
                >
                  27832332
                </span>
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={13}
                color={"#778090"}
                mt={1}
              >
                Time created:
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#212121",
                    paddingLeft: 5,
                  }}
                >
                  21 June 2022 11:30PM
                </span>
              </Typography>
            </Box>
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

            <Grid container>
              <Grid item md={8}>
                <Box mt={1}>
                  <Box>
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          width: 8,
                          height: 8,

                          borderRadius: "50%",
                          backgroundColor: "#c8e6c9",
                          color: "white",
                          border: "3px solid #04A56D",
                          padding: 3,
                        }}
                      ></div>{" "}
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={16}
                        fontWeight={600}
                        pl={1}
                      >
                        Confirm Order Info
                      </Typography>
                    </div>{" "}
                    <div className="d-flex justify-content-start">
                      <div
                        style={{
                          borderLeft: "1px dotted #212121",
                          width: 1,
                          minHeight: 120,
                          height: "100%",
                          marginLeft: 5,
                          width: 20,
                        }}
                      ></div>
                      <div className="row w-100" style={{ maxWidth: 600 }}>
                        <div className="col-md-4">
                          <Box mt={2}>
                            <Typography
                              textAlign="left"
                              variant="body2"
                              fontSize={14}
                              fontWeight={500}
                              color={"#778090"}
                            >
                              Amount
                            </Typography>
                            <Typography
                              textAlign="left"
                              variant="body2"
                              fontSize={18}
                              color={"#04A56D"}
                              fontWeight={600}
                              letterSpacing={1.1}
                            >
                              $120
                            </Typography>
                          </Box>
                        </div>
                        <div className="col-md-4">
                          <Box mt={2}>
                            <Typography
                              textAlign="left"
                              variant="body2"
                              fontSize={14}
                              fontWeight={500}
                              color={"#778090"}
                            >
                              Price
                            </Typography>
                            <Typography
                              textAlign="left"
                              variant="body2"
                              fontSize={18}
                              color={"#212121"}
                              fontWeight={600}
                              letterSpacing={1.1}
                            >
                              82.67
                            </Typography>
                          </Box>
                        </div>
                        <div className="col-md-4">
                          <Box mt={2}>
                            <Typography
                              textAlign="left"
                              variant="body2"
                              fontSize={14}
                              fontWeight={500}
                              color={"#778090"}
                            >
                              Quantity
                            </Typography>
                            <Typography
                              textAlign="left"
                              variant="body2"
                              fontSize={18}
                              color={"#212121"}
                              fontWeight={600}
                              letterSpacing={1.1}
                            >
                              548 USDT
                            </Typography>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </Box>
                  <Box>
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          width: 8,
                          height: 8,

                          borderRadius: "50%",
                          backgroundColor: "#f9f9f9",
                          color: "white",
                          border: "3px solid #bdbdbd",
                          padding: 3,
                        }}
                      ></div>{" "}
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={16}
                        fontWeight={600}
                        pl={1}
                      >
                        Transfer the funds to seller account provided below:
                      </Typography>
                    </div>{" "}
                    <div className="d-flex justify-content-start h-100">
                      <div
                        style={{
                          borderLeft: "1px dotted #212121",
                          width: 1,
                          height: "100%",
                          minHeight: 340,
                          marginLeft: 5,
                          width: 20,
                        }}
                      ></div>
                      <div className={classes.paymentCard}>
                        <div className="row w-100" style={{ maxWidth: 600 }}>
                          <div className="col-md-4">
                            <Box my={1} style={{ backgroundColor: "#eeeeee" }}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={15}
                                color={"#212121"}
                                fontWeight={600}
                                pl={2}
                                p={1}
                                style={{ borderLeft: "3px solid #6A55EA" }}
                              >
                                IMPS
                              </Typography>
                            </Box>
                            <Box my={1} style={{ backgroundColor: "#f9f9f9" }}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={15}
                                color={"#212121"}
                                fontWeight={600}
                                pl={2}
                                p={1}
                              >
                                Paytm
                              </Typography>
                            </Box>
                            <Box my={1} style={{ backgroundColor: "#f9f9f9" }}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={15}
                                color={"#212121"}
                                fontWeight={600}
                                pl={2}
                                p={1}
                              >
                                UPI
                              </Typography>
                            </Box>
                          </div>
                          <div className="col-md-8">
                            <Box mt={2}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                fontWeight={500}
                                color={"#778090"}
                              >
                                Name
                              </Typography>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                color={"#414141"}
                                fontWeight={600}
                                style={{ paddingTop: 1 }}
                              >
                                Tahir Ahmad
                              </Typography>
                            </Box>
                            <Box mt={2}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                fontWeight={500}
                                color={"#778090"}
                              >
                                Bank Account Number:
                              </Typography>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                color={"#414141"}
                                fontWeight={600}
                                style={{ paddingTop: 1 }}
                              >
                                342382674638
                              </Typography>
                            </Box>
                            <Box mt={2}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                fontWeight={500}
                                color={"#778090"}
                              >
                                IFSC Code:
                              </Typography>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                color={"#414141"}
                                fontWeight={600}
                                style={{ paddingTop: 1 }}
                              >
                                SBIN0003570
                              </Typography>
                            </Box>
                            <Box mt={2}>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                fontWeight={500}
                                color={"#778090"}
                              >
                                Bank Name:
                              </Typography>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                fontSize={14}
                                color={"#414141"}
                                fontWeight={600}
                                style={{ paddingTop: 1 }}
                              >
                                SBI India
                              </Typography>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                  <Box>
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          width: 8,
                          height: 8,

                          borderRadius: "50%",
                          backgroundColor: "#c8e6c9",
                          color: "white",
                          border: "3px solid #04A56D",
                          padding: 3,
                        }}
                      ></div>{" "}
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={16}
                        fontWeight={600}
                        pl={1}
                      >
                        Completed
                      </Typography>
                    </div>{" "}
                    <div
                      style={{
                        borderLeft: "1px dotted #212121",
                        width: 1,
                        height: 0,
                        marginLeft: 5,
                        minWidth: 170,
                      }}
                    ></div>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  mt={2}
                  style={{ width: "100%" }}
                  className={classes.chatCard}
                >
                  <Box
                    py={3}
                    style={{
                      backgroundColor: "#6A55EA",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <Typography
                      display="flex"
                      textAlign="left"
                      variant="body1"
                      color={"white"}
                      p={2}
                      style={{ fontWeight: 600 }}
                    >
                      Chat with seller:
                    </Typography>
                  </Box>
                  <Box p={2} style={{ width: "100%" }}>
                    <Typography
                      textAlign="right"
                      variant="body1"
                      color={"black"}
                      p={2}
                      style={{ fontWeight: 600 }}
                    >
                      Did receive?
                    </Typography>
                    <Typography
                      textAlign="left"
                      variant="body1"
                      color={"black"}
                      p={2}
                      style={{ fontWeight: 600 }}
                    >
                      Let me check
                    </Typography>
                    <Typography
                      textAlign="right"
                      variant="body1"
                      color={"black"}
                      p={2}
                      style={{ fontWeight: 600 }}
                    >
                      Sure
                    </Typography>
                    <Typography
                      textAlign="left"
                      variant="body1"
                      color={"black"}
                      p={2}
                      style={{ fontWeight: 600 }}
                    >
                      Yes, Received!
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

export default OrderWaiting;
