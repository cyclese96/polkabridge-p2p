import { Box, Button, Container, Grid, Input, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useLocation, useParams } from "react-router-dom";
import HowItWorks from "../../common/HowItWorks";
import { getOrderDetailsById } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { fromWei, toWei } from "../../utils/helper";
import BigNumber from "bignumber.js";
import { startOrderTrade } from "../../actions/tradeActions";

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
  buttonAction: {
    backgroundColor: "green",
    border: `1px solid #6A55EA`,
    borderRadius: 14,
    marginRight: 5,
  },
}));

function OrderSummary() {
  const classes = useStyles();
  const { order_id } = useParams();
  const search = useLocation().search;
  const tradeType = new URLSearchParams(search).get("tradeType");
  const dispatch = useDispatch();

  const order = useSelector((state) => state?.order?.order);

  const [fiatInput, setFiatInput] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [isExactIn, setIsExactIn] = useState(true);

  const currentUserAuth = useSelector((state) => state?.user?.jwtToken);

  useEffect(() => {
    async function asyncFn() {
      if (order_id) {
        console.log(order_id);
        await dispatch(getOrderDetailsById(order_id));
      }
    }
    asyncFn();
  }, [order_id]);

  const onFiatInputChange = useCallback(
    (value) => {
      if (!isExactIn) {
        setIsExactIn(true);
      }

      setFiatInput(value);
    },
    [setFiatInput, tokenInput, isExactIn, setIsExactIn]
  );

  const onTokenInputChange = useCallback(
    (value) => {
      if (isExactIn) {
        setIsExactIn(false);
      }
      setTokenInput(value);
    },
    [setTokenInput, isExactIn, order, setIsExactIn]
  );

  const handleMax = useCallback(() => {
    if (isExactIn) {
      setIsExactIn(false);
    }

    setTokenInput(fromWei(order?.pending_amount, order?.token?.decimals));
  }, [setTokenInput, tokenInput, setIsExactIn, order]);

  const parsedFiatInput = useMemo(() => {
    if (isExactIn) {
      return fiatInput;
    }

    return new BigNumber(tokenInput)
      .multipliedBy(order?.order_unit_price)
      ?.toString();
  }, [isExactIn, fiatInput, tokenInput, order]);

  const parsedTokenInput = useMemo(() => {
    if (isExactIn && fiatInput) {
      return new BigNumber(fiatInput)
        .div(order?.order_unit_price)
        .toFixed(4)
        .toString();
    }

    return tokenInput;
  }, [isExactIn, order, tokenInput, fiatInput]);

  const tokenInputError = useMemo(() => {
    if (
      new BigNumber(parsedTokenInput).gt(
        fromWei(order?.pending_amount, order?.token?.decimals)
      )
    ) {
      return { status: true, message: "Invalid token amounts" };
    } else {
      return { status: false, message: "" };
    }
  }, [parsedTokenInput, order]);

  const createTradeLoading = useSelector(
    (state) => state?.userTrade?.createTradeLoading
  );

  const handleTrade = useCallback(() => {
    if (!tradeType) {
      return;
    }

    const tradeInput = {
      orderId: order_id,
      tokenAmount: toWei(parsedTokenInput, order?.token?.decimals),
      fiatAmount: parsedFiatInput,
    };

    dispatch(startOrderTrade(currentUserAuth, tradeType, tradeInput));
  }, [currentUserAuth, tradeType, order, parsedTokenInput, parsedFiatInput]);

  const handleOnCancelTrade = useCallback(() => {
    setFiatInput("");
  }, [tradeType, setFiatInput]);

  useEffect(() => {
    console.log("tradetype", tradeType);
  }, [tradeType]);

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
              Buy PBR with {order?.fiat?.fiat}
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
                              order?.pending_amount,
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
                          {order?.payment_options?.map((paymentOption) => (
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                paddingLeft: 5,
                                color: "#212121",
                              }}
                            >
                              {paymentOption?.toString()?.toUpperCase()}
                            </span>
                          ))}
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
                        {/* Please mark your payment withing time limit by only
                        given payments method. */}
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
                        value={parsedFiatInput}
                        onChange={(e) => onFiatInputChange(e.target.value)}
                      />
                      <Button
                        className={classes.buttonAction}
                        onClick={handleMax}
                      >
                        All
                      </Button>
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
                        error={tokenInputError.status}
                        // disableUnderline
                        placeholder="0.00"
                        value={parsedTokenInput}
                        onChange={(e) => onTokenInputChange(e.target.value)}
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
                    {tokenInputError?.status && (
                      <div>{tokenInputError.message}</div>
                    )}
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
                      onClick={handleOnCancelTrade}
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
                      disabled={tokenInputError?.status || createTradeLoading}
                      onClick={handleTrade}
                    >
                      {tradeType} {order?.token?.symbol}
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
