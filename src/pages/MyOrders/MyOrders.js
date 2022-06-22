import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";
import { useUserOrders } from "../../hooks/useOrders";
import { fromWei } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  infoCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 30,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
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
  label: {
    color: "#c4c4c4",
    fontWeight: 500,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    padding: "5px 15px 5px 15px",
    color: "white",
  },
  orderTab: {
    backgroundColor: "#EEEEEE",
    padding: "5px 15px 5px 15px",
    fontWeight: 600,
  },
  orderTabSelected: {
    backgroundColor: theme.palette.primary.main,
    padding: "5px 15px 5px 15px",
    color: "white",
    fontWeight: 600,
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
    color: theme.palette.primary.main,
  },
  otherText: {
    fontSize: 14,
    fontWeight: 400,
  },
  filterCard: {
    marginTop: 10,
    marginBottom: 10,
    height: "100%",
    width: "80%",
    border: "1px solid #eeeeee",

    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
}));

function MyOrders() {
  const classes = useStyles();
  const theme = useTheme();

  const store = useSelector((state) => state);
  const { fiats, tokens, payments } = store.order;
  const [pageNumber, setPageNumber] = useState(1);
  const [orderType, setOrderType] = useState("all");
  const [token, setToken] = useState("All");
  const [orderStatus, setorderStatus] = useState("all");
  const [tabValue, setTabValue] = React.useState(0);

  const profile = useSelector((state) => state?.profile?.profile);

  const [userOrders, ordersLoading, updatePageNumber, updateFilters] =
    useUserOrders(profile?._id);

  const selectedToken = useMemo(() => {
    const tokenObject = tokens?.find((item) => item?.symbol === token);
    if (!tokenObject) {
      return { _id: null };
    }
    return tokenObject;
  }, [tokens, token]);

  // useEffect(() => {
  //   console.log("my orders ", { userOrders, profile, authStatus });
  // }, [userOrders, profile, authStatus]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApplyFilters = () => {
    // prepare filter object based on current selection
    const filter = {
      order_type:
        orderType === "all" ? null : orderType === "sell" ? "buy" : "sell",
      token: selectedToken?._id,
      order_status: orderStatus,
    };

    updateFilters(filter);
  };

  useEffect(() => {
    handleApplyFilters();
  }, [orderType, selectedToken, orderStatus]);

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Typography
            variant="h3"
            color="textSecondary"
            className={classes.title}
          >
            My Orders
          </Typography>
        </Box>
        <Box mt={2}>
          <Box sx={{ width: "100%", marginBottom: 1 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value={0} label="Processing" />
              <Tab value={1} label="All Orders" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Box>
              <Box className={classes.tableCard}>
                <table className={classes.table}>
                  <tr className={classes.tr}>
                    <th>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color={"#616161"}
                        fontSize={12}
                        style={{ fontWeight: 500 }}
                      >
                        Type/Coin
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
                        Fiat Amount
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
                        Price
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
                        Crypto amount
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
                        Order type
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
                        Status
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
                        Time
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
                        Operation
                      </Typography>
                    </th>
                  </tr>

                  {userOrders?.map((item) => (
                    <tr className={classes.tr}>
                      <td style={{ width: "12%" }}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.userText}
                        >
                          {item?.token?.symbol}
                        </Typography>
                      </td>
                      <td style={{ width: "12%" }}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {item?.order_unit_price *
                            fromWei(
                              item?.pending_amount,
                              item?.token?.decimals
                            )}
                        </Typography>
                      </td>
                      <td
                        className={classes.otherText}
                        style={{ width: "10%" }}
                      >
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {fromWei(item?.pending_amount, item?.token?.decimals)}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            INR
                          </span>
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {item?.order_unit_price}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {item?.token?.symbol}
                          </span>
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {item?.order_type.toUpperCase()}
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                          color={"#313131"}
                        >
                          Waiting...
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          11:30PM
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        <Button
                          style={{
                            borderRadius: 10,
                            backgroundColor: theme.palette.primary.main,
                            padding: "5px 20px 5px 20px",
                            color: "white",
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </table>
                <div className="text-center">
                  {ordersLoading && <CircularProgress />}
                </div>
              </Box>
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Box className={classes.tableCard}>
                <table className={classes.table}>
                  <tr className={classes.tr}>
                    <th>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color={"#616161"}
                        fontSize={12}
                        style={{ fontWeight: 500 }}
                      >
                        Type/Coin
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
                        Fiat Amount
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
                        Price
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
                        Crypto amount
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
                        Order type
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
                        Status
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
                        Time
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
                        Operation
                      </Typography>
                    </th>
                  </tr>

                  {userOrders?.map((item) => (
                    <tr className={classes.tr}>
                      <td style={{ width: "12%" }}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.userText}
                        >
                          {item?.token?.symbol}
                        </Typography>
                      </td>
                      <td style={{ width: "12%" }}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {item?.order_unit_price *
                            fromWei(
                              item?.pending_amount,
                              item?.token?.decimals
                            )}
                        </Typography>
                      </td>
                      <td
                        className={classes.otherText}
                        style={{ width: "10%" }}
                      >
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {fromWei(item?.pending_amount, item?.token?.decimals)}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            INR
                          </span>
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {item?.order_unit_price}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {item?.token?.symbol}
                          </span>
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          {item?.order_type.toUpperCase()}
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          Completed
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        {" "}
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.otherText}
                        >
                          11:30
                        </Typography>
                      </td>
                      <td className={classes.otherText}>
                        <Button
                          style={{
                            borderRadius: 10,
                            backgroundColor: theme.palette.primary.main,
                            padding: "5px 20px 5px 20px",
                            color: "white",
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </table>
                <div className="text-center">
                  {ordersLoading && <CircularProgress />}
                </div>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default MyOrders;
