import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { fromWei } from "../../../utils/helper";
import ChatBox from "./ChatBox";
import PaymentInfo from "./PaymentInfo";
import ChatSection from "../../../common/ChatSection";

export default function BuyOrderWaiting({ classes, pendingTrade, tradeType }) {
  const isFiatTransferDone = useMemo(() => {
    if (pendingTrade?.transaction_status >= 2) {
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

  return (
    <div className={classes.infoCard}>
      <Typography
        variant="body2"
        color={"#212121"}
        fontSize={16}
        fontWeight={500}
      >
        {tradeType} {pendingTrade?.order?.token?.symbol} with{" "}
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
                    backgroundColor: isFiatTransferDone ? "#c8e6c9" : "#f9f9f9",
                    color: "white",
                    border: isFiatTransferDone
                      ? "3px solid #04A56D"
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
                <PaymentInfo
                  classes={classes}
                  pendingTrade={pendingTrade}
                  isFiatTransferDone={isFiatTransferDone}
                />
              </div>
            </Box>
            <Box>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: 8,
                    height: 8,

                    borderRadius: "50%",
                    backgroundColor: isTradeCompleted ? "#c8e6c9" : "#f9f9f9",
                    color: "white",
                    border: isTradeCompleted
                      ? "3px solid #04A56D"
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
          <ChatSection />
        </Grid>
      </Grid>
    </div>
  );
}
