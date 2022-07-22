import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useParams } from "react-router-dom";
import HowItWorks from "../../common/HowItWorks";
import { getOrderDetailsById } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fromWei } from "../../utils/helper";
import BigNumber from "bignumber.js";

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

  const dispatch = useDispatch();
  const { order_id } = useParams();
  const order = useSelector((state) => state?.order?.order);
  const userAuth = useSelector((state) => state?.user);

  useEffect(async () => {
    if (!order_id || !userAuth?.jwtToken) {
      return;
    }

    dispatch(getOrderDetailsById(order_id, userAuth?.jwtToken));
  }, [order_id, userAuth]);

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Box display={"flex"} justifyContent="space-between">
            <Box>
              <Typography
                variant="h3"
                color="textSecondary"
                className={classes.title}
              >
                Order Details
              </Typography>
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
                  {order?.order_id}
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
                  {moment(order?.created_at).format("hh:mm A MM-DD-YYYY")}
                </span>
              </Typography>
            </Box>
          </Box>
          <div className={classes.infoCard}>
            <Typography variant="h4" classes={classes.cardTitle} align="center">
              Buy Order: #{order?.order_id}
            </Typography>
            <Typography
              variant="body2"
              classes={classes.para}
              fontSize={13}
              color={"#919191"}
              align="center"
              pt={1}
            >
              Executed at: ---
            </Typography>
            <Box className="text-center">
              <img src="/images/success_icon.png" height="100px" />
            </Box>

            <div className="d-flex justify-content-center">
              <div
                className="row justify-content-start mt-1"
                style={{ maxWidth: 800, width: "100%" }}
              >
                <div className="col-md-4 mt-3">
                  <Box>
                    <Typography
                      display="flex"
                      textAlign="left"
                      variant="body2"
                      fontSize={13}
                      color={"#757575"}
                      style={{ fontWeight: 500 }}
                    >
                      Total Fiat Amount
                    </Typography>
                    <Typography
                      variant="body1"
                      align="left"
                      fontSize={22}
                      style={{ fontWeight: 600 }}
                      color={"#212121"}
                    >
                      {new BigNumber(
                        fromWei(order?.pending_amount, order?.token?.decimals)
                      )
                        .multipliedBy(order?.order_unit_price)
                        ?.toString()}{" "}
                      <span style={{ fontSize: 14, paddingLeft: 2 }}>
                        {" "}
                        {order?.fiat?.fiat}
                      </span>
                    </Typography>
                  </Box>
                </div>

                <div className="col-md-4 mt-3">
                  <Typography
                    display="flex"
                    textAlign="left"
                    variant="body2"
                    fontSize={13}
                    color={"#757575"}
                    style={{ fontWeight: 500 }}
                  >
                    Crypto price
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    fontSize={20}
                    style={{ fontWeight: 600 }}
                    color={"#212121"}
                  >
                    {order?.order_unit_price}
                    <span style={{ fontSize: 14, paddingLeft: 2 }}>
                      {order?.fiat?.fiat}
                    </span>
                  </Typography>
                </div>
                <div className="col-md-4 mt-3">
                  <Box>
                    <Typography
                      display="flex"
                      textAlign="left"
                      variant="body2"
                      fontSize={13}
                      color={"#757575"}
                      style={{ fontWeight: 500 }}
                    >
                      Crypto Amount
                    </Typography>
                    <Typography
                      variant="body1"
                      align="left"
                      fontSize={20}
                      style={{ fontWeight: 600 }}
                      color={"#212121"}
                    >
                      {fromWei(order?.pending_amount, order?.token?.decimals)}{" "}
                      <span style={{ fontSize: 14, paddingLeft: 2 }}>
                        {" "}
                        {order?.token?.symbol}
                      </span>
                    </Typography>
                  </Box>
                </div>
                <div className="col-md-4 mt-4">
                  <Typography
                    display="flex"
                    textAlign="left"
                    variant="body2"
                    fontSize={13}
                    color={"#757575"}
                    style={{ fontWeight: 500 }}
                  >
                    Trade between
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    fontSize={20}
                    style={{ fontWeight: 600 }}
                    color={"#212121"}
                  >
                    {order?.token?.symbol} - {order?.fiat?.fiat}
                  </Typography>
                </div>
                <div className="col-md-4 mt-4">
                  <Typography
                    display="flex"
                    textAlign="left"
                    variant="body2"
                    fontSize={13}
                    color={"#757575"}
                    style={{ fontWeight: 500 }}
                  >
                    Payment
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    fontSize={20}
                    style={{ fontWeight: 600 }}
                    color={"#212121"}
                  >
                    {order?.payment_options?.map((value) => (
                      <Box
                        style={{
                          backgroundColor: "#E1DCFF",
                          width: "fit-content",
                          padding: "5px 14px 5px 14px",

                          borderRadius: 7,
                          marginRight: 5,
                          fontSize: 14,
                        }}
                      >
                        {value.toUpperCase()}
                      </Box>
                    ))}
                  </Typography>
                </div>
                <div className="col-md-4 mt-4">
                  <Typography
                    display="flex"
                    textAlign="left"
                    variant="body2"
                    fontSize={13}
                    color={"#757575"}
                    style={{ fontWeight: 500 }}
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    fontSize={20}
                    style={{ fontWeight: 600 }}
                    color={"#212121"}
                  >
                    {order?.order_status}
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
