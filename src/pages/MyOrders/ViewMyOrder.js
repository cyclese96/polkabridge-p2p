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
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useParams } from "react-router-dom";
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
import { getOrderDetailsById } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

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

function ViewMyOrder() {
  const classes = useStyles();
  const theme = useTheme();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { order_id } = useParams();
  // const { order } = store.order;
  const order = useSelector((state) => state?.order?.order);

  useEffect(async () => {
    dispatch(getOrderDetailsById(order_id));
  }, [order_id]);

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Box>
            <Typography
              variant="h3"
              color="textSecondary"
              className={classes.title}
            >
              Order Details
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.subtitle}
            >
              You have successfully executed this order
            </Typography>
          </Box>
          <div className={classes.infoCard}>
            <Typography variant="h4" classes={classes.cardTitle} align="center">
              Buy Order: #4734638
            </Typography>
            <Typography
              variant="body2"
              classes={classes.para}
              fontSize={13}
              color={"#919191"}
              align="center"
              pt={1}
            >
              Executed at: 21 June, 2022 2PM UTC
            </Typography>
            <Box className="text-center">
              <img src="/images/success_icon.png" height="100px" />
            </Box>

            <div className="d-flex justify-content-center">
              <div
                className="row justify-content-evenly mt-1"
                style={{ maxWidth: 800, width: "100%" }}
              >
                <div className="col-md-3 mt-3">
                  <Typography display="flex" alignItems={"center"}>
                    Order Amount:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ fontWeight: 600 }}
                  >
                    2132
                  </Typography>
                </div>
                <div className="col-md-3 mt-3">
                  <Typography display="flex" alignItems={"center"}>
                    Offer Price:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ fontWeight: 600 }}
                  >
                    1.56 INR
                  </Typography>
                </div>
                <div className="col-md-3 mt-3">
                  <Typography display="flex" alignItems={"center"}>
                    Fiat Amount:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ fontWeight: 600 }}
                  >
                    50,000
                  </Typography>
                </div>
                <div className="col-md-3 mt-3">
                  <Typography display="flex" alignItems={"center"}>
                    Payment Type:
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ fontWeight: 600 }}
                  >
                    UPI
                  </Typography>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-evenly text-center mt-5">
              <Link to="/my-orders">
                <Button
                  style={{
                    borderRadius: 10,
                    background: "#6A55EA",
                    padding: "9px 55px 9px 55px",
                    color: "white",
                  }}
                >
                  Need Help?
                </Button>
              </Link>
              <Link to="/">
                <Button
                  style={{
                    borderRadius: 10,
                    background: "#6A55EA",
                    padding: "9px 55px 9px 55px",
                    color: "white",
                  }}
                >
                  Go To Home
                </Button>
              </Link>
            </div>
          </div>
          <HowItWorks />
        </Box>
      </Container>
    </Box>
  );
}

export default ViewMyOrder;
