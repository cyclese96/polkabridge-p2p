import React, { useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";

export default function OrderProgress({
  pendingTrade,
  createLoading,
  fetchLoading,
  tradeType,
}) {
  const isFiatTransferDone = useMemo(() => {
    // todo: add transfer logic
    if (pendingTrade?.transaction_status >= 2) {
      return true;
    }
    return false;
  }, [pendingTrade]);

  const isSellerTokenReleased = useMemo(() => {
    if (pendingTrade?.transaction_status === 3) {
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

  // for sell order status
  const isBuyerConfirmedPayment = useMemo(() => {
    if (pendingTrade?.transaction_status === 2) {
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

  return (
    <Box display={"flex"} justifyContent="space-between">
      {tradeType === "buy" && (
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
                  backgroundColor: isFiatTransferDone ? "#04A56D" : "#bdbdbd",
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
                  width: "90%",
                  height: 1,
                  marginLeft: 5,
                  minWidth: 200,
                }}
              ></div>
            </div>{" "}
            <Typography
              textAlign="left"
              variant="body2"
              fontSize={14}
              fontWeight={500}
              color={isFiatTransferDone ? "none" : "#919191"}
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
                  backgroundColor: isSellerTokenReleased
                    ? "#04A56D"
                    : "#bdbdbd",
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
              color={isSellerTokenReleased ? "none" : "#919191"}
              mt={1}
            >
              {isSellerTokenReleased
                ? "Seller relased tokens"
                : "Pending seller confirmation"}
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
                  backgroundColor: isTradeCompleted ? "#04A56D" : "#bdbdbd",
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
              color={isTradeCompleted ? "none" : "#919191"}
              mt={1}
            >
              Completed
            </Typography>
          </Box>
        </Box>
      )}

      {tradeType === "sell" && (
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
                  width: "90%",
                  height: 1,
                  marginLeft: 5,
                  minWidth: 200,
                }}
              ></div>
            </div>{" "}
            <Typography
              textAlign="left"
              variant="body2"
              fontSize={14}
              fontWeight={500}
              mt={1}
              color={isTokenDeposited ? "none" : "#919191"}
            >
              Deposit tokens to PBR's reserve
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
                  backgroundColor: isBuyerConfirmedPayment
                    ? "#04A56D"
                    : "#bdbdbd",
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
              color={isBuyerConfirmedPayment ? "none" : "#919191"}
            >
              Pending buyer confirmation
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
                  backgroundColor: isTradeCompleted ? "#04A56D" : "#bdbdbd",
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
              color={isTradeCompleted ? "none" : "#919191"}
            >
              Completed
            </Typography>
          </Box>
        </Box>
      )}

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
            {moment(pendingTrade?.created_at).format("hh:mm A MM-DD-YYYY")}
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
