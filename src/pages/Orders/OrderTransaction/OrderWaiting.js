import { Box, Container } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserTradeByOrderId } from "../../../actions/tradeActions";

import OrderProgress from "./OrderProgress";
import BuyOrderWaiting from "./BuyOrderWaiting";
import SellOrderWaiting from "./SellOrderWaiting";

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
  buttonAction: {
    backgroundColor: "green",
    border: `1px solid #6A55EA`,
    borderRadius: 14,
    marginRight: 5,
  },
}));

function OrderWaiting() {
  const classes = useStyles();
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

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Box>
            <h4 variant="h4" color="textSecondary" className={classes.title}>
              {tradeType?.toUpperCase()} Order Processing
            </h4>
          </Box>

          <OrderProgress
            tradeType={tradeType}
            pendingTrade={pendingTrade}
            createLoading={createLoading}
            fetchLoading={fetchLoading}
          />

          {!(createLoading || fetchLoading) && tradeType === "buy" && (
            <BuyOrderWaiting
              tradeType={tradeType}
              pendingTrade={pendingTrade}
              classes={classes}
            />
          )}
          {!(createLoading || fetchLoading) && tradeType === "sell" && (
            <SellOrderWaiting
              tradeType={tradeType}
              pendingTrade={pendingTrade}
              classes={classes}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default OrderWaiting;
