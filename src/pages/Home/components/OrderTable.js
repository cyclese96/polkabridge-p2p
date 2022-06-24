import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formattedAddress, fromWei } from "../../../utils/helper";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    textAlign: "center",
  },
  tableCard: {
    width: "100%",
    height: "100%",
    width: "100%",
    border: "1px solid #EAECEE",
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 20,
  },
  table: {
    width: "100%",
  },
  tr: {
    width: "100%",

    paddingLeft: 10,
  },
  trHighlight: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 10,
  },
  userText: {
    fontSize: 13,
    fontWeight: 500,
    color: "#1943DB",
  },
  orderText: {
    fontSize: 13,
    fontWeight: 400,
  },
  otherText: {
    fontSize: 13,
    fontWeight: 400,
  },
  orderTab: {
    backgroundColor: "#EEEEEE",
    padding: "5px 15px 5px 15px",
    fontWeight: 600,
  },
  orderTabSelected: {
    backgroundColor: "#DF097C",
    padding: "5px 15px 5px 15px",
    color: "white",
    fontWeight: 600,
  },
  tableHeading: {
    fontSize: 13,
    fontWeight: 600,
  },
  buttonAction: {
    backgroundColor: "green",
    border: `1px solid #6A55EA`,
    borderRadius: 14,
  },
}));

export default function OrderTable({ orders }) {
  const classes = useStyles();

  return (
    <Box mt={5}>
      <h5 className={classes.title}>Market Open Orders</h5>
      <Box p={2}>
        <Box className={classes.tableCard}>
          <table className={classes.table}>
            <thead>
              <th style={{ width: "20%" }}>
                <Typography
                  textAlign="left"
                  variant="body2"
                  color={"#616161"}
                  fontSize={12}
                  pl={1}
                  style={{ fontWeight: 500 }}
                >
                  Advertisers
                </Typography>
              </th>
              <th style={{ width: "20%" }}>
                <Typography
                  textAlign="left"
                  variant="body2"
                  color={"#616161"}
                  fontSize={12}
                  style={{ fontWeight: 500 }}
                >
                  Price
                </Typography>
              </th>
              <th style={{ width: "20%" }}>
                {" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  color={"#616161"}
                  fontSize={12}
                  style={{ fontWeight: 500 }}
                >
                  Crypto Amount
                </Typography>
              </th>
              <th style={{ width: "15%" }}>
                {" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  color={"#616161"}
                  fontSize={12}
                  style={{ fontWeight: 500 }}
                >
                  Total Fiat Amount
                </Typography>
              </th>
              <th style={{ width: "15%" }}>
                {" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  color={"#616161"}
                  fontSize={12}
                  style={{ fontWeight: 500 }}
                >
                  Payment
                </Typography>
              </th>

              <th>
                {" "}
                <Typography
                  textAlign="left"
                  variant="body2"
                  color={"#616161"}
                  fontSize={12}
                  style={{ fontWeight: 500 }}
                >
                  Trade
                </Typography>
              </th>
            </thead>
            {orders?.map((order, index) => {
              return (
                <>
                  {
                    <tr
                      className={
                        index % 2 === 0 ? classes.trHighlight : classes.tr
                      }
                    >
                      <td
                        className={classes.userText}
                        style={{ paddingLeft: 10 }}
                      >
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          style={{ fontWeight: 500 }}
                          className={classes.userText}
                        >
                          {order?.user?.name ||
                            formattedAddress(order?.user?.wallet_address)}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {order?.order_unit_price}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {order?.fiat?.fiat}
                          </span>
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#212121"}
                          style={{ fontWeight: 500 }}
                        >
                          {fromWei(
                            order?.pending_amount,
                            order?.token?.decimals
                          )}
                          <span style={{ paddingLeft: 5 }}>
                            {order?.token?.symbol}
                          </span>
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={14}
                          color={"#212121"}
                          style={{ fontWeight: 500, paddingTop: 7 }}
                        >
                          {order?.order_unit_price *
                            fromWei(
                              order?.pending_amount,
                              order?.token?.decimals
                            )}
                          <span style={{ paddingLeft: 5 }}>
                            {order?.fiat?.fiat}
                          </span>
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        {order?.payment_options?.join(", ").toUpperCase()}
                      </td>
                      <td className={classes.otherText}>
                        {moment(order?.created_at).format("hh:mm A MM-DD-YYYY")}
                      </td>
                      <td className={classes.otherText}>
                        {order?.order_type === "sell" ? (
                          <Link
                            to={`/order/${order?._id}?tradeType=buy`}
                            style={{ textDecoration: "none" }}
                          >
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
                              BUY {order?.token?.symbol}
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            to={`/order/${order._id}?tradeType=sell`}
                            style={{ textDecoration: "none" }}
                          >
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
                              SELL {order?.token?.symbol}
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  }
                </>
              );
            })}
          </table>
        </Box>
      </Box>{" "}
    </Box>
  );
}
