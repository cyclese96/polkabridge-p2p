import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { fromWei } from "../../../utils/helper";
import ChatBox from "./ChatBox";
import CheckIcon from "@mui/icons-material/Check";
import { TransactionState } from "../../../utils/interface";
import { useTokenAllowance } from "../../../hooks/useAllowance";
import { useDepositCallback } from "../../../hooks/useDepositCallback";
import { useSelector } from "react-redux";
import { ALLOWANCE_AMOUNT } from "../../../constants";

export default function SellOrderWaiting({ classes, pendingTrade, tradeType }) {
  // for sell order status
  const isBuyerConfirmedPayment = useMemo(() => {
    if (pendingTrade?.transaction_status === 2) {
      return true;
    }
    return false;
  }, [pendingTrade]);

  const isTradeCompleted = useMemo(() => {
    if (pendingTrade?.transaction_status === 3) {
      return true;
    }
    return false;
  }, [pendingTrade]);

  const isTokenDeposited = useMemo(() => {
    if (pendingTrade?.transaction_status === 0) {
      return false;
    }
    return true;
  }, [pendingTrade]);

  const tokens = useSelector((state) => state?.order?.tokens);

  const selectedToken = useMemo(() => {
    if (!pendingTrade?._id) {
      return {};
    }
    return pendingTrade?.order?.token;
  }, [pendingTrade]);

  const [allowance, confirmAllowance, allowanceTrxStatus] =
    useTokenAllowance(selectedToken);
  const [depositTokens, withdrawTokens, depositTrxStatus] =
    useDepositCallback(selectedToken);

  const handleDeposit = useCallback(() => {
    const tokenAmount = fromWei(
      pendingTrade?.token_amount,
      pendingTrade?.order?.token?.decimals
    );

    if (!allowance) {
      confirmAllowance(ALLOWANCE_AMOUNT);
    } else {
      depositTokens(tokenAmount);
    }
  }, [pendingTrade, allowance]);

  const isPendingTrx = useMemo(() => {
    return (
      allowanceTrxStatus?.status === TransactionState.PENDING ||
      allowanceTrxStatus?.status === TransactionState.WAITING ||
      depositTrxStatus.status === TransactionState.PENDING ||
      depositTrxStatus.status === TransactionState.WAITING
    );
  }, [allowanceTrxStatus, depositTrxStatus]);

  return (
    <div className={classes.infoCard}>
      <Typography
        variant="body2"
        color={"#212121"}
        fontSize={16}
        fontWeight={500}
      >
        {tradeType.toUpperCase()} {pendingTrade?.order?.token?.symbol} with{" "}
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
                        color={"#ef5350"}
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
                    border: isTokenDeposited
                      ? "3px solid  #04A56D"
                      : "3px solid #bdbdbd",
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
                  Deposit{" "}
                  {fromWei(
                    pendingTrade?.token_amount,
                    pendingTrade?.order?.token?.decimals
                  )}{" "}
                  {pendingTrade?.order?.token?.symbol} to PolkaBridge reserve
                  for escrow:
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
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-coin-4416139-3664000.png"
                      height="100px"
                      style={{ marginTop: 20 }}
                    />{" "}
                    ----------------
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/cryptocurrency-24/64/bitcoin_coin_cryptocurrency_currency_digital_bank_money_finance_financial_business_-512.png"
                      height="100px"
                      style={{ marginTop: 20 }}
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      style={{
                        borderRadius: 7,
                        background: isTokenDeposited ? "#bdbdbd" : "#6A55EA",
                        marginTop: 20,
                        color: "white",
                        minWidth: 200,
                        maxWidth: 300,
                        fontWeight: 600,
                        width: "100%",
                        marginLeft: 5,
                      }}
                      onClick={() => handleDeposit()}
                    >
                      {isTokenDeposited ? (
                        <>
                          <CheckIcon
                            color="success"
                            fontSize="small"
                            style={{ marginRight: 10 }}
                          />
                          Token deposited
                        </>
                      ) : !allowance ? (
                        "Allow token deposit"
                      ) : (
                        "Deposit tokens"
                      )}
                    </Button>
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
                    border: isBuyerConfirmedPayment
                      ? "3px solid  #04A56D"
                      : "3px solid #bdbdbd",
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
                  Waiting for buyer's confirmation
                </Typography>
              </div>{" "}
              {pendingTrade?.transaction_status >= 1 && (
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
                    {isBuyerConfirmedPayment ? (
                      <div className="d-flex  justify-content-center align-items-center">
                        <CheckIcon
                          color="success"
                          fontSize="small"
                          style={{ marginRight: 10 }}
                        />{" "}
                        Buyer confirmed payment
                      </div>
                    ) : (
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <img
                            src="/loader.gif"
                            height="100px"
                            style={{ marginTop: 20 }}
                          />{" "}
                        </div>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          fontWeight={600}
                          pt={2}
                        >
                          Waiting for confirmation
                        </Typography>
                        <div className="text-center mt-2">
                          <Button
                            style={{
                              backgroundColor: "white",
                              border: `1px solid #6A55EA`,
                              borderRadius: 14,
                              paddingLeft: 20,
                              paddingRight: 20,
                              fontSize: 12,
                            }}
                          >
                            Raise dispute
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
                  Completed
                </Typography>
              </div>{" "}
              {isTradeCompleted && (
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
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/check-2872554-2389850.png"
                          height="100px"
                          style={{ marginTop: 20 }}
                        />{" "}
                      </div>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        fontSize={16}
                        fontWeight={600}
                        pl={1}
                      >
                        Your order is executes successfully.
                      </Typography>
                      <div className="text-center mt-2">
                        <Button
                          style={{
                            backgroundColor: "white",
                            border: `1px solid #6A55EA`,
                            borderRadius: 14,
                            paddingLeft: 20,
                            paddingRight: 20,
                            fontSize: 12,
                          }}
                        >
                          View your order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item md={4}>
          <ChatBox />
        </Grid>
      </Grid>
    </div>
  );
}
