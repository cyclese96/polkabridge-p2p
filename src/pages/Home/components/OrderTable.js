import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";
import { getLatestOrders } from "./../../../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Web3 from "web3";

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

export default function OrderTable({ filterParams }) {
  const store = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { orders } = store.order;
  const [filteredOrder, setFilteredOrder] = useState([]);

  useEffect(() => {
    if (orders) {
      let data = orders.filter(
        (singleOrder) => singleOrder.order_type === filterParams.orderType
      );
      console.log(data);
      console.log(orders);
      setFilteredOrder([...data]);
    }
  }, [filterParams, orders]);
  return (
    <Box mt={5}>
      <h5 className={classes.title}>Market Open Orders</h5>
      <Box p={2}>
        <Box className={classes.tableCard}>
          <table className={classes.table}>
            <thead>
              <th className={classes.tableHeading}>User</th>
              <th className={classes.tableHeading}>
                Price ({filterParams.token}/{filterParams.fiat})
              </th>
              <th className={classes.tableHeading}>Quantity</th>
              <th className={classes.tableHeading}>Payment Mode</th>
              <th className={classes.tableHeading}>Date</th>

              <th className={classes.tableHeading}>Actions</th>
            </thead>
            {filteredOrder.map((order, index) => {
              return (
                <>
                  {index % 2 === 1 ? (
                    <tr className={classes.tr}>
                      <td
                        className={classes.userText}
                        style={{ paddingLeft: 10 }}
                      >
                        {order.user.wallet_address.slice(0, 6)}...
                      </td>
                      <td className={classes.otherText}>
                        {order.order_unit_price}
                      </td>
                      <td className={classes.otherText}>
                        {order &&
                          Web3.utils.fromWei(
                            order.order_amount.toString(),
                            "ether"
                          )}
                      </td>

                      <td className={classes.otherText}>
                        {" "}
                        {order.payment_options.join(", ").toUpperCase()}
                      </td>
                      <td className={classes.otherText}>04, May 2022</td>
                      <td className={classes.otherText}>
                        {order.order_type === "buy" ? (
                          <Link
                            to={`/order/${order._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              BUY
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            to={`/order/${order._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              SELL
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ) : (
                    <tr className={classes.trHighlight}>
                      <td
                        className={classes.userText}
                        style={{ paddingLeft: 10 }}
                      >
                        0x98...3234
                      </td>
                      <td className={classes.otherText}>
                        {order.order_unit_price}
                      </td>
                      <td className={classes.otherText}>
                        {order &&
                          Web3.utils.fromWei(
                            order.order_amount.toString(),
                            "ether"
                          )}
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        {order.payment_options.join(", ").toUpperCase()}
                      </td>
                      <td className={classes.otherText}>07, May 2022</td>
                      {console.log(order)}
                      <td className={classes.otherText}>
                        {order.order_type === "buy" ? (
                          <Link
                            to={`/order/${order._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              BUY
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            to={`/order/${order._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className={classes.buttonAction}>
                              SELL
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </table>
        </Box>
      </Box>{" "}
    </Box>
  );
}
