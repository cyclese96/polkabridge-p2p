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
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toWei } from "../../utils/helper";
import { useDepositCallback } from "../../hooks/useDepositCallback";
import { useTokenAllowance } from "../../hooks/useAllowance";
import { ALLOWANCE_AMOUNT } from "../../constants/index";
import { getUserProfile } from "../../actions/profileActions";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useCreateOrderCallback } from "../../hooks/useCreateOrderCallback";
import { CreateStatus, TransactionState } from "../../utils/interface";

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
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-start",
  },
  buttonFirst: {
    width: "fit-content",
    color: "#212121",
    backgroundColor: "#eeeeee",
    padding: "5px 25px 5px 25px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    cursor: "pointer",
    borderLeft: "4px solid #e5e5e5",
    borderTop: "4px solid #e5e5e5",
    borderBottom: "4px solid #e5e5e5",
  },
  buttonSecond: {
    width: "fit-content",
    color: "white",
    backgroundColor: "#6A55EA",
    padding: "5px 25px 5px 25px",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    cursor: "pointer",
    borderRight: "4px solid #e5e5e5",
    borderTop: "4px solid #e5e5e5",
    borderBottom: "4px solid #e5e5e5",
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

function CreateOrder() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chainId } = useActiveWeb3React();

  const theme = useTheme();

  //States
  const [step, setStep] = useState(0);

  const [orderType, setOrderType] = useState("buy");
  const [fiat, setFiat] = useState("INR");
  const [price, setPrice] = useState("");
  const [token, setToken] = useState("PBR");
  const [tokenAmount, setTokenAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");
  const [depositStatus, setDepositState] = useState(0); //0 : not ready for deposit,1 ready for deposit, 2: deposit verified

  const fiats = useSelector((state) => state?.order?.fiats);
  const tokens = useSelector((state) => state?.order?.tokens);
  const userPaymentOptions = useSelector(
    (state) => state?.profile?.profile?.payment_options
  );

  // const updateTotalAmount = (inputValue) => {};
  const updatePaymentMethods = (selectedValue) => {
    console.log(selectedValue);
    if (paymentMethods.includes(selectedValue)) {
      const index = paymentMethods.indexOf(selectedValue);
      let tempArray = paymentMethods;
      tempArray.splice(index, 1);
      setPaymentMethods([...tempArray]);
    } else {
      let tempArray = paymentMethods;
      tempArray.push(selectedValue);
      setPaymentMethods([...tempArray]);
    }
  };

  const reviewOrderFn = () => {
    if (price && token && tokenAmount && paymentMethods.length > 0) {
      setError("");
      setStep(1);
    } else {
      setError("Please fill all the fields.");
    }
  };

  const selectedFiat = useMemo(() => {
    const fiatObj = fiats?.filter((item) => item?.fiat === fiat);
    if (fiatObj?.length > 0) {
      return fiatObj?.[0];
    }
  }, [fiats, fiat]);

  const selectedToken = useMemo(() => {
    const tokenObj = tokens?.filter((item) => item?.symbol === token);
    if (tokenObj?.length > 0) {
      return tokenObj?.[0];
    }
  }, [tokens, token]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    dispatch(getUserProfile());
  }, [chainId]);

  const [allowance, confirmAllowance, allowanceTrxStatus] =
    useTokenAllowance(selectedToken);
  const [depositTokens, withdrawTokens, depositTrxStatus] =
    useDepositCallback(selectedToken);
  const [orderStatus, createBuyOrder, createSellOrder, validateSellOrder] =
    useCreateOrderCallback();

  const submitOrder = () => {
    if (orderType === "buy") {
      const payload = {
        order_amount: toWei(tokenAmount, selectedToken?.decimals),
        token: selectedToken?._id,
        fiat: selectedFiat?._id,
        order_unit_price: parseFloat(price),
        payment_options: paymentMethods,
      };

      createBuyOrder(payload);
    } else {
      const payload = {
        order_amount: toWei(tokenAmount, selectedToken?.decimals),
        token: selectedToken?._id,
        fiat: selectedFiat?._id,
        order_unit_price: parseFloat(price),
        payment_options: paymentMethods,
      };

      createSellOrder(payload);
    }
  };

  const handleDeposit = () => {
    console.log("allowance ", allowance);
    if (!allowance) {
      confirmAllowance(ALLOWANCE_AMOUNT);
    } else {
      depositTokens(tokenAmount);
    }
  };

  useEffect(() => {
    console.log("deposit trx", { orderStatus, depositTrxStatus });
    if (orderStatus.status === CreateStatus.ACTIVE) {
      // navigate to confirmation page
      navigate(`/order-placed/${orderStatus.id}`);
    }

    if (
      orderType === "sell" &&
      orderStatus.status === CreateStatus.SUBMITTED &&
      depositTrxStatus.status === TransactionState.COMPLETED
    ) {
      console.log("starting validation ... ", orderStatus.id);
      validateSellOrder(orderStatus.id);
    }
  }, [depositTrxStatus, orderStatus, orderType]);

  // const handleConfirm = async () => {
  //   // call verify order deposit api
  // };

  useEffect(() => {
    console.log("payment optios ", userPaymentOptions?.length === 0);
  }, [userPaymentOptions]);

  const isPendingTrx = useMemo(() => {
    return (
      allowanceTrxStatus?.status === TransactionState.PENDING ||
      allowanceTrxStatus?.status === TransactionState.WAITING ||
      depositTrxStatus.status === TransactionState.PENDING ||
      depositTrxStatus.status === TransactionState.WAITING
    );
  }, [allowanceTrxStatus, depositTrxStatus]);

  return (
    <Box className={classes.background}>
      {step === 0 && (
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
            </Box>
            <div className={classes.infoCard}>
              <Grid container>
                <Grid item md={7}>
                  {" "}
                  <Box style={{ width: "100%", maxWidth: 300 }}>
                    <Typography
                      variant="body2"
                      color={"#212121"}
                      fontSize={16}
                      fontWeight={500}
                    >
                      - Initiate New P2P Order
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent="start" mt={3}>
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
                        Set type and price
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
                            minWidth: 180,
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
                        Set amount and payments
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
                      </div>{" "}
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={14}
                        fontWeight={500}
                        mt={1}
                        color={"#919191"}
                      >
                        Submit
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={5}>
                    <Grid container>
                      <Grid item md={4} display="flex">
                        <Typography
                          display="flex"
                          alignItems={"center"}
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
                          I want to:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Box className={classes.buttonWrapper}>
                          <Box
                            className={classes.buttonFirst}
                            style={{
                              backgroundColor:
                                orderType === "buy" ? "#6A55EA" : "#eeeeee",
                              color: orderType === "buy" ? "white" : "#212121",
                            }}
                            onClick={() => setOrderType("buy")}
                          >
                            Buy
                          </Box>
                          <Box
                            className={classes.buttonSecond}
                            style={{
                              backgroundColor:
                                orderType === "sell" ? "#6A55EA" : "#eeeeee",
                              color: orderType === "sell" ? "white" : "#212121",
                            }}
                            onClick={() => setOrderType("sell")}
                          >
                            Sell
                          </Box>
                        </Box>
                        {/* <Box
                          display="flex"
                          alignItems={"center"}
                          style={{
                            width: "fit-content",
                          }}
                        >
                          <Box
                            onClick={() => setOrderType("buy")}
                            style={{
                              backgroundColor:
                                orderType === "buy" ? "#E1DCFF" : "transparent",
                              border: "2px solid #E1DCFF",
                              width: "fit-content",
                              padding: "5px 20px 5px 20px",
                              cursor: "pointer",
                              borderRadius: 7,
                              marginRight: 5,
                              fontSize: 14,
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {orderType === "buy" ? (
                              <Box
                                style={{
                                  height: 10,
                                  width: 10,
                                  borderRadius: "50%",
                                  border: "1px solid #919191",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginRight: 5,
                                }}
                              >
                                <div
                                  style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: "50%",
                                    border: "1px solid #919191",
                                    backgroundColor: "#81c784",
                                  }}
                                ></div>
                              </Box>
                            ) : (
                              <div
                                style={{
                                  height: 10,
                                  width: 10,
                                  borderRadius: "50%",
                                  border: "1px solid #454545",
                                  marginRight: 5,
                                }}
                              ></div>
                            )}
                            Buy
                          </Box>
                          <Box
                            onClick={() => setOrderType("sell")}
                            style={{
                              border: "2px solid #E1DCFF",
                              cursor: "pointer",
                              backgroundColor:
                                orderType === "sell"
                                  ? "#E1DCFF"
                                  : "transparent",
                              width: "fit-content",
                              padding: "5px 20px 5px 20px",
                              borderRadius: 7,
                              marginRight: 5,
                              fontSize: 14,
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {orderType === "sell" ? (
                              <Box
                                style={{
                                  height: 10,
                                  width: 10,
                                  borderRadius: "50%",
                                  border: "1px solid #919191",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginRight: 5,
                                }}
                              >
                                <div
                                  style={{
                                    height: 8,
                                    width: 8,
                                    borderRadius: "50%",
                                    border: "1px solid #919191",
                                    backgroundColor: "#81c784",
                                  }}
                                ></div>
                              </Box>
                            ) : (
                              <div
                                style={{
                                  height: 10,
                                  width: 10,
                                  borderRadius: "50%",
                                  border: "1px solid #454545",
                                  marginRight: 5,
                                }}
                              ></div>
                            )}
                            Sell
                          </Box>
                        </Box> */}
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={4} display="flex">
                        <Typography
                          alignItems={"center"}
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
                          Price:
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
                            value={price}
                            placeholder="0"
                            onChange={(e) => setPrice(e.target.value)}
                            disableUnderline={true}
                          />
                          <Select
                            variant="standard"
                            disableUnderline={true}
                            value={fiat}
                            label="Age"
                            style={{
                              fontWeight: 600,
                              letterSpacing: 1,
                              color: "#212121",
                            }}
                            onChange={(e) => setFiat(e.target.value)}
                          >
                            {fiats?.map((item) => (
                              <MenuItem value={item?.fiat}>
                                {item?.fiat}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={4} display="flex">
                        <Typography
                          alignItems={"center"}
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
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
                            value={tokenAmount}
                            placeholder="0"
                            onChange={(e) => setTokenAmount(e.target.value)}
                            disableUnderline={true}
                          />
                          <Select
                            variant="standard"
                            disableUnderline={true}
                            value={token}
                            label="Age"
                            style={{
                              fontWeight: 600,
                              letterSpacing: 1,
                              color: "#212121",
                            }}
                            onChange={(e) => setToken(e.target.value)}
                          >
                            {tokens?.map((item) => (
                              <MenuItem
                                onClick={() => setToken(item?.symbol)}
                                value={item?.symbol}
                              >
                                {item?.symbol}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={4} display="flex">
                        <Typography
                          alignItems={"center"}
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
                          Total (INR):
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Box
                          display="flex"
                          alignItems={"center"}
                          style={{
                            width: "fit-content",
                            fontWeight: 600,
                          }}
                        >
                          <div style={{ marginRight: 10, fontWeight: 600 }}>
                            {tokenAmount * price}
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container mt={3}>
                      <Grid item md={4} display="flex">
                        <Typography
                          alignItems={"center"}
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
                          Payment:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Box
                          display="flex"
                          style={{
                            width: "fit-content",
                          }}
                        >
                          {userPaymentOptions?.map((value) => {
                            return (
                              <Box
                                onClick={() =>
                                  updatePaymentMethods(value?.payment_mode)
                                }
                                style={{
                                  backgroundColor: paymentMethods.includes(
                                    value?.payment_mode
                                  )
                                    ? "#E1DCFF"
                                    : "transparent",
                                  width: "fit-content",
                                  padding: "5px 14px 5px 14px",
                                  borderRadius: 7,
                                  marginRight: 5,
                                  fontSize: 14,
                                  cursor: "pointer",
                                  border: "1px solid #E1DCFF",
                                }}
                              >
                                {value?.payment_mode}
                              </Box>
                            );
                          })}
                          {userPaymentOptions?.length === 0 && (
                            <a
                              href="/profile"
                              style={{
                                backgroundColor: "#E1DCFF",
                                width: "fit-content",
                                padding: "5px 14px 5px 14px",
                                borderRadius: 7,
                                marginRight: 5,
                                fontSize: 14,
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "black",
                                border: "1px solid #E1DCFF",
                              }}
                            >
                              {"Add payment method"}
                            </a>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item md={5}>
                  <Grid container>
                    <Grid item md={5}>
                      <Box>
                        <Typography
                          display="flex"
                          textAlign="left"
                          variant="body2"
                          fontSize={13}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
                          Current Market Price
                        </Typography>
                        <Typography
                          variant="body1"
                          align="left"
                          fontSize={22}
                          style={{ fontWeight: 600 }}
                          color={"#04A56D"}
                        >
                          82.21{" "}
                          <span style={{ fontSize: 14, paddingLeft: 2 }}>
                            INR
                          </span>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid md={5}>
                      <Box>
                        <Typography
                          display="flex"
                          textAlign="left"
                          variant="body2"
                          fontSize={13}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                        >
                          Highest Market Price
                        </Typography>
                        <Typography
                          variant="body1"
                          align="left"
                          fontSize={22}
                          style={{ fontWeight: 600 }}
                        >
                          89.21{" "}
                          <span style={{ fontSize: 14, paddingLeft: 2 }}>
                            INR
                          </span>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    mt={3}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="left"
                      style={{ marginBottom: 10 }}
                    >
                      Remark:
                    </Typography>
                    <TextareaAutosize
                      type="text"
                      placeholder="Enter your message for seller"
                      style={{
                        width: "80%",
                        height: 240,
                        border: "1px solid #EAECEE",
                        boxSizing: "border-box",
                        borderRadius: 15,
                        outline: "none",
                        padding: 10,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <div className="text-center mt-4 mb-2">
                <Button
                  onClick={reviewOrderFn}
                  style={{
                    borderRadius: 10,
                    background: "#6A55EA",
                    padding: "9px 35px 9px 35px",
                    color: "white",
                  }}
                >
                  Submit Order
                </Button>
              </div>
              <div style={{ color: "red", textAlign: "center" }}>{error}</div>
            </div>
            <HowItWorks />
          </Box>
        </Container>
      )}
      {step === 1 && (
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
              <Typography
                variant="h4"
                classes={classes.cardTitle}
                align="center"
              >
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
                          {orderType} Order
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
                            {price}
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
                            {tokenAmount} {token}
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
                          Total (INR):
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
                            {price * tokenAmount}
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
                          {userPaymentOptions?.map((value) => {
                            return (
                              <Box
                                style={{
                                  backgroundColor: paymentMethods.includes(
                                    value?.payment_mode
                                  )
                                    ? "#E1DCFF"
                                    : "transparent",
                                  width: "fit-content",
                                  padding: "5px 14px 5px 14px",
                                  borderRadius: 7,
                                  marginRight: 5,
                                  fontSize: 14,
                                  cursor: "pointer",
                                  border: "1px solid #E1DCFF",
                                }}
                              >
                                {value?.payment_mode}
                              </Box>
                            );
                          })}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
                <div className="col-md-6">
                  <Grid container mt={2}>
                    <Grid item md={5} display="flex">
                      <Typography display="flex" alignItems={"center"}>
                        <History
                          style={{ marginRight: 12, color: "#616161" }}
                        />{" "}
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
                {orderStatus.status === CreateStatus.PENDING &&
                  orderType === "sell" && (
                    <Button
                      onClick={submitOrder}
                      style={{
                        borderRadius: 10,
                        background: "#6A55EA",
                        padding: "9px 35px 9px 35px",
                        color: "white",
                      }}
                    >
                      Create sell order
                    </Button>
                  )}

                {orderStatus.status === CreateStatus.SUBMITTED &&
                  !isPendingTrx &&
                  orderType === "sell" && (
                    <Button
                      onClick={handleDeposit}
                      style={{
                        borderRadius: 10,
                        background: "#6A55EA",
                        padding: "9px 35px 9px 35px",
                        color: "white",
                      }}
                    >
                      {!allowance ? "Approve tokens" : "Deposit tokens"}
                    </Button>
                  )}
                {isPendingTrx && (
                  <Button
                    disabled={isPendingTrx}
                    style={{
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "9px 35px 9px 35px",
                      color: "white",
                    }}
                  >
                    Pending transaction...
                  </Button>
                )}

                {/* {depositTrxStatus.status === "verified" &&
                  orderType === "sell" && (
                    <Button
                      onClick={handleConfirm}
                      style={{
                        borderRadius: 10,
                        background: "#6A55EA",
                        padding: "9px 35px 9px 35px",
                        color: "white",
                      }}
                    >
                      Confirm place sell order
                    </Button>
                  )} */}
                {orderType === "buy" && (
                  <Button
                    onClick={submitOrder}
                    style={{
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "9px 35px 9px 35px",
                      color: "white",
                    }}
                  >
                    Confirm place buy order
                  </Button>
                )}
              </div>
            </div>
            <HowItWorks />
          </Box>
        </Container>
      )}
    </Box>
  );
}

export default CreateOrder;
