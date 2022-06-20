import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { formattedAddress, fromWei } from "../../../utils/helper";

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
              <th className={classes.tableHeading}>Seller</th>
              <th className={classes.tableHeading}>Order Amount</th>
              <th className={classes.tableHeading}>Price</th>
              <th className={classes.tableHeading}>Payment Mode</th>
              <th className={classes.tableHeading}>Date</th>
              <th className={classes.tableHeading}>Action</th>
            </thead>
            {orders?.map((order, index) => {
              return (
                <>
                  {
                    <tr className={classes.trHighlight}>
                      <td
                        className={classes.userText}
                        style={{ paddingLeft: 10 }}
                      >
                        {order?.user?.name ||
                          formattedAddress(order?.user?.wallet_address)}
                      </td>
                      <td className={classes.otherText}>
                        {fromWei(
                          order?.pending_amount,
                          order?.token?.decimals
                        ) +
                          " " +
                          order?.token?.symbol}
                      </td>
                      <td className={classes.otherText}>
                        {order?.order_unit_price + " " + order?.fiat?.fiat}
                      </td>

                      <td className={classes.otherText}>
                        {" "}
                        {order?.payment_options?.join(", ").toUpperCase()}
                      </td>
                      <td className={classes.otherText}>07, May 2022</td>
                      <td className={classes.otherText}>
                        {order?.order_type === "sell" ? (
                          <Link
                            to={`/order/${order?._id}?tradeType=buy`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              BUY {order?.token?.symbol}
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            to={`/order/${order._id}?tradeType=sell`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              SELL {order?.token?.symbol}
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  }
                  {/* <tr className={classes.tr}>
                      <td
                        className={classes.userText}
                        style={{ paddingLeft: 10 }}
                      >
                        
                      </td>
                      <td className={classes.otherText}>
                        {order?.order_unit_price}
                      </td>
                      <td className={classes.otherText}>
                        {order?.type === "sell"
                          ? fromWei(order?.amount)
                          : order?.order_amount}
                      </td>

                      <td className={classes.otherText}>
                        {" "}
                        {order?.payment_options?.join(", ").toUpperCase()}
                      </td>
                      <td className={classes.otherText}>04, May 2022</td>
                      <td className={classes.otherText}>
                        {order?.order_type === "buy" ? (
                          <Link
                            to={`/order/${order._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              SELL
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            to={`/order/${order?._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              BUY
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr> */}
                </>
              );
            })}
          </table>
        </Box>
      </Box>{" "}
    </Box>
  );
}
