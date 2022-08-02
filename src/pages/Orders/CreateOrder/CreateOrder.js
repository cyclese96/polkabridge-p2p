import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import HowItWorks from "../../../common/HowItWorks";
import TxPopup from "../../../common/popups/TxPopup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  depositFee,
  fromWei,
  tokenAmountAfterFee,
  tokenAmountWithFee,
  toWei,
} from "../../../utils/helper";
import { useDepositCallback } from "../../../hooks/useDepositCallback";
import { useTokenAllowance } from "../../../hooks/useAllowance";
import { ALLOWANCE_AMOUNT } from "../../../constants/index";
import { getUserProfile } from "../../../actions/profileActions";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useCreateOrderCallback } from "../../../hooks/useCreateOrderCallback";
import { TransactionState } from "../../../utils/interface";
import BigNumber from "bignumber.js";
import { createOrder } from "../../../utils/httpCalls";
import PopupLayout from "../../../common/popups/PopupLayout";
import { getCurrenctMarketPrice } from "../../../actions/orderActions";

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
  const { chainId, account } = useActiveWeb3React();

  //States
  const [step, setStep] = useState(0);

  const [orderType, setOrderType] = useState("buy");
  const [fiat, setFiat] = useState("INR");
  const [price, setPrice] = useState("");
  const [token, setToken] = useState("PBR");
  const [tokenAmount, setTokenAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");

  const fiats = useSelector((state) => state?.order?.fiats);
  const tokens = useSelector((state) => state?.order?.tokens);
  const [isOpen, setOpen] = useState(false);
  const userPaymentOptions = useSelector(
    (state) => state?.profile?.profile?.payment_options
  );
  const userAuth = useSelector((state) => state?.user);

  const buyMarketPrice = useSelector((state) => state?.order?.buyMarketPrice);
  const sellMarketPrice = useSelector((state) => state?.order?.sellMarketPrice);

  // const updateTotalAmount = (inputValue) => {};
  const updatePaymentMethods = (selectedValue) => {
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
    if (!chainId || !userAuth?.jwtToken || !account) {
      return;
    }
    dispatch(getUserProfile(account, userAuth?.jwtToken));
  }, [chainId, account, userAuth]);

  useEffect(() => {
    if (
      !chainId ||
      !userAuth?.jwtToken ||
      !selectedFiat?._id ||
      !selectedToken?._id
    ) {
      return;
    }

    dispatch(
      getCurrenctMarketPrice(
        selectedToken?._id,
        selectedFiat?._id,
        userAuth?.jwtToken
      )
    );
  }, [chainId, selectedFiat, selectedToken, userAuth]);

  const [
    allowance,
    confirmAllowance,
    allowanceTrxStatus,
    resetAllwanceTrxState,
  ] = useTokenAllowance(selectedToken);
  const [
    depositTokens,
    withdrawTokens,
    resetTrxState,
    depositTrxStatus,
    userAvailableDeposits,
  ] = useDepositCallback(selectedToken, selectedToken?._id);

  const handleModalClose = useCallback(() => {
    setOpen(false);
    resetTrxState();
    resetAllwanceTrxState();
  }, [isOpen, setOpen, resetTrxState]);

  useEffect(() => {
    console.log("user deposits", {
      userAvailableDeposits,
    });
  }, [userAvailableDeposits]);

  const depositsNeeded = useMemo(() => {
    // deposit needed = tokenAmount - available deposits

    const _tokenAmt = toWei(tokenAmount, selectedToken?.decimals);
    const _tokenAmtAfterFee = tokenAmountAfterFee(_tokenAmt, selectedToken);

    if (new BigNumber(userAvailableDeposits).gte(_tokenAmtAfterFee)) {
      return "0";
    }

    const _depositNeeded = new BigNumber(_tokenAmtAfterFee)
      .minus(!userAvailableDeposits ? "0" : userAvailableDeposits)
      ?.toString();

    const _depositNeededWithFee = tokenAmountWithFee(
      _depositNeeded,
      selectedToken
    );

    return _depositNeededWithFee?.toString();
  }, [userAvailableDeposits, tokenAmount, selectedToken]);

  const isSufficientDeposits = useMemo(() => {
    return new BigNumber(depositsNeeded).eq(0);
  }, [depositsNeeded]);

  // sell order states
  const isSubmitOrderDisabled = useMemo(() => {
    if (orderType !== "sell") {
      return false;
    }

    return new BigNumber(tokenAmount).lte(0) || !isSufficientDeposits;
  }, [isSufficientDeposits, tokenAmount, orderType]);

  const submitOrder = useCallback(async () => {
    if (orderType === "buy") {
      const payload = {
        order_amount: toWei(tokenAmount, selectedToken?.decimals),
        token: selectedToken?._id,
        fiat: selectedFiat?._id,
        order_unit_price: parseFloat(price),
        payment_options: paymentMethods,
        description: remarks,
      };

      const response = await createOrder("buy", payload, userAuth?.jwtToken);
      if (response?.status === 201) {
        navigate(`/order-placed/${response?.data?._id}`);
      } else {
        //todo
        //handle error alert
      }
    } else {
      const payload = {
        order_amount: toWei(tokenAmount, selectedToken?.decimals),
        token: selectedToken?._id,
        fiat: selectedFiat?._id,
        order_unit_price: parseFloat(price),
        payment_options: paymentMethods,
        description: remarks,
      };
      console.log("payload", payload);
      const response = await createOrder("sell", payload, userAuth?.jwtToken);
      if (response?.status === 201) {
        navigate(`/order-placed/${response?.data?._id}`);
      } else {
        //todo
        //handle error alert
      }
    }
  }, [
    orderType,
    tokenAmount,
    selectedToken,
    selectedFiat,
    price,
    paymentMethods,
    userAuth,
    remarks,
  ]);

  const handleDeposit = useCallback(() => {
    if (!allowance) {
      confirmAllowance(ALLOWANCE_AMOUNT);
    } else {
      depositTokens(depositsNeeded);
    }
  }, [depositsNeeded, depositTokens, confirmAllowance, allowance]);

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
      <PopupLayout
        popupActive={
          depositTrxStatus?.state > 0 || allowanceTrxStatus.state > 0
        }
      >
        <TxPopup
          txCase={
            allowanceTrxStatus?.state
              ? allowanceTrxStatus?.state
              : depositTrxStatus?.state
          }
          hash={depositTrxStatus?.hash}
          resetPopup={handleModalClose}
        />
      </PopupLayout>
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
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={4} display="flex">
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          fontWeight={500}
                          color={"#76808F"}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          Crypto price:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Box
                          display="flex"
                          alignItems={"center"}
                          justifyContent="space-between"
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
                            type="number"
                            value={price}
                            placeholder="0"
                            onChange={(e) => setPrice(e.target.value)}
                            disableUnderline={true}
                            style={{ width: "100%" }}
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
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          Crypto amount:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Box
                          display="flex"
                          alignItems={"center"}
                          justifyContent="space-between"
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
                            type="number"
                            value={tokenAmount}
                            placeholder="0"
                            onChange={(e) => setTokenAmount(e.target.value)}
                            disableUnderline={true}
                            style={{ width: "100%" }}
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
                          Total fiat amount:
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
                          <Typography
                            textAlign="left"
                            variant="body2"
                            fontSize={18}
                            style={{ fontWeight: 500 }}
                            className={classes.otherText}
                          >
                            {tokenAmount * price}
                            <span style={{ fontSize: 14, paddingLeft: 4 }}>
                              {selectedFiat?.fiat}
                            </span>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container mt={3}>
                      <Grid item md={4} display="flex">
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          Payment Methods:
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
                                <div className="d-flex justify-content-center align-items-center">
                                  <img
                                    src="https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_bank-512.png"
                                    height="15px"
                                    style={{ marginRight: 5 }}
                                  />
                                  <Typography
                                    alignItems={"center"}
                                    textAlign="left"
                                    variant="body2"
                                    fontSize={14}
                                    color={"#313131"}
                                    style={{ fontWeight: 500 }}
                                  >
                                    {value?.payment_mode.toUpperCase()}
                                  </Typography>
                                </div>
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
                          {orderType === "buy"
                            ? buyMarketPrice?.current
                            : sellMarketPrice?.current}
                          <span style={{ fontSize: 14, paddingLeft: 2 }}>
                            {selectedFiat?.fiat}
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
                          {orderType === "sell"
                            ? "Highest Market Price"
                            : "Lowest Market Price"}
                        </Typography>
                        <Typography
                          variant="body1"
                          align="left"
                          fontSize={22}
                          style={{ fontWeight: 600 }}
                        >
                          {orderType === "buy"
                            ? buyMarketPrice?.allTime
                            : sellMarketPrice?.allTime}
                          <span style={{ fontSize: 14, paddingLeft: 2 }}>
                            {selectedFiat?.fiat}
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
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
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
                  Preview Order
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
                      - Review New P2P Order
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
                            backgroundColor: "#04A56D",
                            color: "white",
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
                      >
                        Review your order
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
                          Order type:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Typography
                          alignItems={"center"}
                          textAlign="left"
                          variant="body2"
                          fontSize={16}
                          color={"#313131"}
                          style={{ fontWeight: 600 }}
                        >
                          {orderType.toUpperCase()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={4} display="flex">
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          fontWeight={500}
                          color={"#76808F"}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          Crypto price:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={16}
                          color={"#212121"}
                          style={{ fontWeight: 500 }}
                        >
                          {price}
                          <span style={{ fontSize: 12, paddingLeft: 5 }}>
                            {fiat}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container mt={2}>
                      <Grid item md={4} display="flex">
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          Crypto amount:
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={16}
                          color={"#212121"}
                          style={{ fontWeight: 500 }}
                        >
                          {tokenAmount}
                          <span style={{ fontSize: 12, paddingLeft: 5 }}>
                            {token}
                          </span>
                        </Typography>
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
                          Total fiat amount:
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
                          <Typography
                            textAlign="left"
                            variant="body2"
                            fontSize={18}
                            style={{ fontWeight: 500 }}
                            className={classes.otherText}
                          >
                            {price * tokenAmount}
                            <span style={{ fontSize: 13, paddingLeft: 4 }}>
                              {fiat}
                            </span>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container mt={3}>
                      <Grid item md={4} display="flex">
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#757575"}
                          style={{ fontWeight: 500 }}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          Payment Methods:
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
                                <div className="d-flex justify-content-center align-items-center">
                                  <img
                                    src="https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_bank-512.png"
                                    height="15px"
                                    style={{ marginRight: 5 }}
                                  />
                                  <Typography
                                    alignItems={"center"}
                                    textAlign="left"
                                    variant="body2"
                                    fontSize={14}
                                    color={"#313131"}
                                    style={{ fontWeight: 500 }}
                                  >
                                    {value?.payment_mode.toUpperCase()}
                                  </Typography>
                                </div>
                              </Box>
                            );
                          })}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item md={5}>
                  <Box
                    mt={3}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      textAlign="left"
                      variant="body2"
                      fontSize={18}
                      fontWeight={500}
                      mb={1}
                    >
                      Remarks
                    </Typography>
                    <Typography
                      textAlign="left"
                      variant="body2"
                      fontSize={14}
                      pt={1}
                      color={"#778090"}
                      lineHeight={1.8}
                    >
                      {remarks}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <div className="text-center">
                {orderType === "sell" &&
                  " Your deposits: " +
                    fromWei(userAvailableDeposits, selectedToken.decimals)}
              </div>

              <div className="text-center mt-4 mb-2">
                <Button
                  onClick={() => setStep(0)}
                  style={{
                    borderRadius: 10,
                    background: "#F5F5F5",
                    color: "black",
                    width: 180,
                    // fontWeight: 600,

                    padding: "9px 35px 9px 35px",
                    marginRight: 20,
                  }}
                >
                  Cancel
                </Button>

                {orderType === "sell" && !isSufficientDeposits ? (
                  <>
                    <Button
                      onClick={handleDeposit}
                      style={{
                        borderRadius: 10,
                        background: "#6A55EA",
                        padding: "9px 35px 9px 35px",
                        color: "white",

                        width: 180,
                      }}
                    >
                      {!allowance
                        ? `Approve ${selectedToken?.symbol}`
                        : `Deposit ${selectedToken?.symbol}`}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={submitOrder}
                    style={{
                      borderRadius: 10,
                      background: isSubmitOrderDisabled ? "#FFFFF" : "#6A55EA",
                      padding: "9px 35px 9px 35px",
                      color: isSubmitOrderDisabled ? "black" : "white",
                    }}
                    disabled={isSubmitOrderDisabled}
                  >
                    Submit Order
                  </Button>
                )}
              </div>

              <div style={{ color: "red", textAlign: "center" }}>
                {!isSufficientDeposits &&
                  orderType === "sell" &&
                  `Deposit ${fromWei(
                    depositsNeeded,
                    selectedToken?.decimals
                  )}  ${selectedToken?.symbol}   to create sell order`}
                {error}
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
