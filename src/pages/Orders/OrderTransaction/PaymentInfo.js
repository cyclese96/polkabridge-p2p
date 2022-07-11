import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { updateTrade } from "../../../actions/tradeActions";
export default function PaymentInfo({
  classes,
  pendingTrade,
  isFiatTransferDone,
}) {
  // selected payment option index
  const [selectedPaymentModeIndex, setSelectedMode] = useState(0);
  const dispatch = useDispatch();
  const sellerPaymentOptions = useMemo(() => {
    return pendingTrade?.seller?.payment_options;
  }, [pendingTrade]);

  const currentUserAuth = useSelector((state) => state?.user);

  const selectedPaymentOption = useMemo(() => {
    if (!sellerPaymentOptions) {
      return {};
    }
    if (sellerPaymentOptions?.length === 0) {
      return {};
    }

    return sellerPaymentOptions?.[selectedPaymentModeIndex];
  }, [sellerPaymentOptions, selectedPaymentModeIndex]);

  const handleNotify = useCallback(() => {
    console.log("handle notify seller", { pendingTrade, currentUserAuth });

    if (!pendingTrade?._id || !currentUserAuth?.jwtToken) {
      return;
    }

    // update order status to notify:
    dispatch(updateTrade(pendingTrade?._id, currentUserAuth?.jwtToken));
  }, [pendingTrade, currentUserAuth]);

  return (
    <div className={classes.paymentCard}>
      <div className="row w-100" style={{ maxWidth: 600, minHeight: 280 }}>
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
        {["imps", "neft"].includes(selectedPaymentOption?.payment_mode) && (
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
        {selectedPaymentOption?.payment_mode === "upi" && (
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
                UPI Provider:
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={14}
                color={"#414141"}
                fontWeight={600}
                style={{ paddingTop: 1 }}
              >
                {selectedPaymentOption?.upi_provider}
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
                UPI ID:
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={14}
                color={"#414141"}
                fontWeight={600}
                style={{ paddingTop: 1 }}
              >
                {selectedPaymentOption?.upi_id}
              </Typography>
            </Box>
          </div>
        )}
        {selectedPaymentOption?.payment_mode === "paytm" && (
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
      <div className="row w-100" style={{ maxWidth: 600 }}>
        <Button
          style={{
            borderRadius: 7,
            background: isFiatTransferDone ? "#bdbdbd" : "#6A55EA",

            color: "white",
            minWidth: 200,
            fontWeight: 600,
            width: "50%",
            marginLeft: 5,
            marginTop: 15,
          }}
          disabled={isFiatTransferDone}
          onClick={handleNotify}
        >
          {isFiatTransferDone ? (
            <>
              <CheckIcon
                color="success"
                fontSize="small"
                style={{ marginRight: 10 }}
              />
              Seller notified
            </>
          ) : (
            "Notify Seller"
          )}
        </Button>
      </div>
    </div>
  );
}
