import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { getLatestOrders } from "./../../../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";

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
}));

export default function OrderTable({ filterParams }) {
  const store = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { orders } = store.order;
  const [filteredOrder, setFilteredOrder] = useState([]);

  useEffect(() => {
    async function asyncFn() {
      let res = await dispatch(getLatestOrders());
      console.log(res);
    }
    asyncFn();
  }, []);

  useEffect(() => {
    let data = orders.filter(
      (singleOrder) => singleOrder.order_type === filterParams.orderType
    );
    setFilteredOrder([...data]);
  }, [filterParams]);
  return (
    <Box mt={5}>
      <h5 className={classes.title}>Market Open Orders</h5>
      <Box p={2}>
        <Box className={classes.tableCard}>
          <table className={classes.table}>
            <thead>
              <th className={classes.tableHeading}>User</th>
              <th className={classes.tableHeading}>Price</th>
              <th className={classes.tableHeading}>Amount</th>
              <th className={classes.tableHeading}>Date</th>
              <th className={classes.tableHeading}>Payment Mode</th>
              <th className={classes.tableHeading}>Actions</th>
            </thead>
            {filteredOrder.map((order, index) => {
              return (
                <>
                  (index % 2 === 1 ? (
                  <tr className={classes.tr}>
                    <td
                      className={classes.userText}
                      style={{ paddingLeft: 10 }}
                    >
                      ----
                    </td>
                    <td className={classes.otherText}>{order.order_amount}</td>
                    <td className={classes.otherText}>
                      {order.order_unit_price}
                    </td>
                    <td className={classes.otherText}>UPI, Bank Transfer</td>
                    <td className={classes.otherText}>04, May 2022</td>
                    <td className={classes.otherText}>Buy Now</td>
                  </tr>
                  ) : (
                  <tr className={classes.trHighlight}>
                    <td
                      className={classes.userText}
                      style={{ paddingLeft: 10 }}
                    >
                      0x98...3234
                    </td>
                    <td className={classes.otherText}>0.13</td>
                    <td className={classes.otherText}>35,34,400</td>
                    <td className={classes.otherText}>UPI, Bank Transfer</td>
                    <td className={classes.otherText}>07, May 2022</td>
                    <td className={classes.otherText}>Buy Now</td>
                  </tr>
                  ))
                </>
              );
            })}
          </table>
        </Box>
      </Box>{" "}
    </Box>
  );
}
