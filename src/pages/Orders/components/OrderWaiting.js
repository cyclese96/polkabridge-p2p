import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fromWei } from "../../../utils/helper";
import { getUserTradeByOrderId } from "../../../actions/tradeActions";
import moment from "moment";

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
  const navigate = useNavigate();
  const { order_id } = useParams();
  const dispatch = useDispatch();

  const createLoading = useSelector(
    (state) => state?.userTrade?.createTradeLoading
  );
  const fetchLoading = useSelector(
    (state) => state?.userTrade?.fetchTradeLoading
  );
  const authenticatedUser = useSelector((state) => state?.user);

  const order = useSelector((state) => state?.order?.order);
  const pendingTrade = useSelector((state) => state?.userTrade?.trade); // current order trade

  // load current order transaction with orderId and userId
  // if userId is buyer: load buy order waiting page
  // if userId is seller: load sell order waiting page
  useEffect(() => {
    async function asyncFn() {
      if (order_id && !order?._id && authenticatedUser?.jwtToken) {
        dispatch(getUserTradeByOrderId(authenticatedUser?.jwtToken, order_id));
      }
    }
    asyncFn();
  }, [order_id, order, authenticatedUser]);

  const tradeType = useMemo(() => {
    if (
      authenticatedUser?.id?.toString() === pendingTrade?.buyer?._id?.toString()
    ) {
      return "buy";
    } else {
      return "sell";
    }
  }, [pendingTrade, authenticatedUser]);

  // selected payment option index
  const [selectedPaymentModeIndex, setSelectedMode] = useState(0);
  const sellerPaymentOptions = useMemo(() => {
    // if (!pendingTrade?._id) {
    //   return [];
    // }
    return pendingTrade?.seller?.payment_options;
  }, [pendingTrade]);

  const selectedPaymentOption = useMemo(() => {
    if (!sellerPaymentOptions) {
      return {};
    }
    if (sellerPaymentOptions?.length === 0) {
      return {};
    }

    return sellerPaymentOptions?.[selectedPaymentModeIndex];
  }, [sellerPaymentOptions, selectedPaymentModeIndex]);

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Box>
            <h4 variant="h4" color="textSecondary" className={classes.title}>
              {tradeType?.toUpperCase()} Order Processing
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
                    {createLoading || fetchLoading ? (
                      <CircularProgress size="1rem" />
                    ) : (
                      1
                    )}
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
                  {createLoading
                    ? "Creating order..."
                    : fetchLoading
                    ? "Fetching order..."
                    : "Transfer Payment to seller"}
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
                  {pendingTrade?.order?.order_id}
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
                  {moment(pendingTrade?.created_at).format(
                    "hh:mm A MM-DD-YYYY"
                  )}
                </span>
              </Typography>
            </Box>
          </Box>

          {!(createLoading || fetchLoading) && tradeType === "buy" && (
            <div className={classes.infoCard}>
              <Typography
                variant="body2"
                color={"#212121"}
                fontSize={16}
                fontWeight={500}
              >
                Buy {pendingTrade?.order?.token?.symbol} with{" "}
                {pendingTrade?.order?.fiat?.fiat}
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
                                {pendingTrade?.fiat_amount}{" "}
                                {pendingTrade?.order?.fiat?.fiat}
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
                                {pendingTrade?.order?.order_unit_price}{" "}
                                {pendingTrade?.order?.fiat?.fiat}
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
                                {fromWei(
                                  pendingTrade?.token_amount,
                                  pendingTrade?.order?.token?.decimals
                                )}{" "}
                                {pendingTrade?.order?.token?.symbol}
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
                              {pendingTrade?.seller?.payment_options?.map(
                                (paymentOption, index) => (
                                  <Box
                                    my={1}
                                    style={{
                                      backgroundColor:
                                        selectedPaymentOption?.payment_mode ===
                                        paymentOption?.payment_mode
                                          ? "#eeeeee"
                                          : "#f9f9f9",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedMode(index)}
                                  >
                                    <Typography
                                      textAlign="left"
                                      variant="body2"
                                      fontSize={15}
                                      color={"#212121"}
                                      fontWeight={600}
                                      pl={2}
                                      p={1}
                                      style={{
                                        borderLeft:
                                          selectedPaymentOption?.payment_mode ===
                                          paymentOption?.payment_mode
                                            ? "3px solid #6A55EA"
                                            : "none",
                                      }}
                                    >
                                      {paymentOption?.payment_mode}
                                    </Typography>
                                  </Box>
                                )
                              )}
                            </div>
                            {selectedPaymentOption?.payment_mode === "imps" && (
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
                                    {selectedPaymentOption?.ac_holder_name}
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
                                    {selectedPaymentOption?.account_number}
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
                                    {selectedPaymentOption?.ifsc_code}
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
                                    {selectedPaymentOption?.bank_name}
                                  </Typography>
                                </Box>
                              </div>
                            )}
                            {selectedPaymentOption?.payment_mode ===
                              "paytm" && (
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
                                    {selectedPaymentOption?.ac_holder_name}
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
                                    Paytm Number:
                                  </Typography>
                                  <Typography
                                    textAlign="left"
                                    variant="body2"
                                    fontSize={14}
                                    color={"#414141"}
                                    fontWeight={600}
                                    style={{ paddingTop: 1 }}
                                  >
                                    {selectedPaymentOption?.paytm_number}
                                  </Typography>
                                </Box>
                              </div>
                            )}
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
          )}
          {!(createLoading || fetchLoading) && tradeType === "sell" && (
            <div>Todo</div>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default OrderWaiting;
