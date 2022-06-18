import { CircularProgress, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPaymentPreferences } from "../../../actions/profileActions";

import BankTransferCard from "./OptionCards/BankTransferCard";
import UpiCard from "./OptionCards/UpiCard";
import PaytmNumberCard from "./OptionCards/PaytmNumberCard";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    marginTop: 20,
    marginBottom: 20,

    height: "100%",
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 20,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },

  heading: {
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: "1px solid rgba(145, 145, 145, 0.2)",
    color: "#333333",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },
}));

function ProfilePayments() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const paymentOptions = useSelector(
    (state) => state?.profile?.profile?.payment_options
  );

  const handlePaymentUpdate = useCallback(
    (payload) => {
      dispatch(updateUserPaymentPreferences(payload));
    },
    [updateUserPaymentPreferences]
  );

  const paymentModes = ["imps", "neft", "upi", "paytm"];

  const remainingModes = useMemo(() => {
    const existingModes = paymentOptions
      ?.filter(
        (item) =>
          paymentModes?.includes(item?.payment_mode) && item?.payment_mode
      )
      .map((item) => item?.payment_mode);
    const _remainingModes = paymentModes.filter(
      (item) => !existingModes?.includes(item)
    );
    return _remainingModes;
  }, [paymentOptions]);

  return (
    <div className={classes.infoCard}>
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.heading}
        style={{ fontWeight: 600 }}
      >
        Payment options
      </Typography>
      {!paymentOptions && <CircularProgress />}
      {paymentOptions?.map((paymentOption) => (
        <>
          {["imps", "neft"].includes(paymentOption?.payment_mode) && (
            <BankTransferCard
              paymentOption={paymentOption}
              handleUpdate={handlePaymentUpdate}
              paymentMode={paymentOption?.payment_mode}
            />
          )}{" "}
          {paymentOption?.payment_mode === "upi" && (
            <UpiCard
              paymentOption={paymentOption}
              handleUpdate={handlePaymentUpdate}
              paymentMode={paymentOption?.payment_mode}
            />
          )}
          {paymentOption?.payment_mode === "paytm" && (
            <PaytmNumberCard
              paymentOption={paymentOption}
              handleUpdate={handlePaymentUpdate}
              paymentMode={paymentOption?.payment_mode}
            />
          )}
        </>
      ))}
      {remainingModes?.map((payment_mode) => (
        <>
          {["imps", "neft"].includes(payment_mode) && (
            <BankTransferCard
              paymentOption={null}
              paymentMode={payment_mode}
              handleUpdate={handlePaymentUpdate}
            />
          )}{" "}
          {payment_mode === "upi" && (
            <UpiCard
              paymentOption={null}
              paymentMode={payment_mode}
              handleUpdate={handlePaymentUpdate}
            />
          )}
          {payment_mode === "paytm" && (
            <PaytmNumberCard
              paymentOption={null}
              paymentMode={payment_mode}
              handleUpdate={handlePaymentUpdate}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default ProfilePayments;
