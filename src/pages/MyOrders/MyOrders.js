import {
  Box,
  Button,
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
// import { useUserOrders } from "../../hooks/useOrders";
import { fromWei } from "../../utils/helper";
import { getUserTrades } from "../../actions/tradeActions";
import { useNavigate } from "react-router-dom";
import { getLatestOrders } from "../../actions/orderActions";
import moment from "moment";

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
  const [orderStatus, setorderStatus] = useState("pending");
  const [tabValue, setTabValue] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const profile = useSelector((state) => state?.profile?.profile);
  const authenticatedUser = useSelector((state) => state?.user);
  const loading = useSelector((state) => state?.userTrade?.fetchTradeLoading);
  const pendingTrades = useSelector((state) => state?.userTrade?.trades);

  const userAds = useSelector((state) => state?.order?.userOrders);

  useEffect(() => {
    console.log("user ads", userAds);
  }, [userAds]);
  useEffect(() => {
    if (!authenticatedUser) {
      return;
    }

    //: add filters
    if (tabValue === 2) {
      dispatch(
        getLatestOrders(
          1,
          { ...{}, user: authenticatedUser?._id },
          authenticatedUser?.jwtToken
        )
      );
    }

    dispatch(
      getUserTrades(authenticatedUser?.jwtToken, orderType, orderStatus)
    );
  }, [authenticatedUser, orderType, orderStatus, tabValue]);

  const selectedToken = useMemo(() => {
    const tokenObject = tokens?.find((item) => item?.symbol === token);
    if (!tokenObject) {
      return { _id: null };
    }
    return tokenObject;
  }, [tokens, token]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 1) {
      setorderStatus("all");
    } else {
      setorderStatus("pending");
    }
    setTabValue(newValue);
  };

  const handleApplyFilters = () => {
    // prepare filter object based on current selection
    // const filter = {
    //   order_type:
    //     orderType === "all" ? null : orderType === "sell" ? "buy" : "sell",
    //   token: selectedToken?._id,
    //   order_status: orderStatus,
    // };
    // updateFilters(filter);
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
              <Tab value={2} label="My Ads" />
            </Tabs>
          </Box>

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
                  {tabValue !== 2 && (
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
                  )}
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

                {[0, 1].includes(tabValue) &&
                  pendingTrades?.map((item) => (
                    <tr className={classes.tr}>
                      <td style={{ width: "12%" }}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.userText}
                        >
                          {item?.order?.token?.symbol}
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
                          {item?.fiat_amount}{" "}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {item?.order?.fiat?.fiat}
                          </span>
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
                          {item?.order?.order_unit_price}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {item?.order?.fiat?.fiat}
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
                          {fromWei(
                            item?.token_amount,
                            item?.order?.token?.decimals
                          )}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {item?.order?.token?.symbol}
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
                          {item?.buyer?._id?.toString() ===
                          authenticatedUser?.id?.toString()
                            ? "Buy"
                            : "Sell"}
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
                          {item?.transaction_status < 3 && "Pending"}
                          {item?.transaction_status === 3 && "Completed"}
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
                          {moment(item?.created_at).format(
                            "hh:mm A MM-DD-YYYY"
                          )}
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
                          onClick={() =>
                            navigate(`/order-waiting/${item?.order?._id}`)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                {/* my ads */}
                {[2].includes(tabValue) &&
                  userAds?.map((orderAd) => (
                    <tr className={classes.tr}>
                      <td style={{ width: "12%" }}>
                        <Typography
                          textAlign="left"
                          variant="body2"
                          fontSize={15}
                          style={{ fontWeight: 500 }}
                          className={classes.userText}
                        >
                          {orderAd?.token?.symbol}
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
                          {orderAd?.order_unit_price}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {orderAd?.fiat?.fiat}
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
                          {fromWei(
                            orderAd?.pending_amount,
                            orderAd?.token?.decimals
                          )}
                          <span style={{ fontSize: 10, paddingLeft: 4 }}>
                            {orderAd?.token?.symbol}
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
                          {orderAd?.order_type?.toUpperCase()}
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
                          {orderAd?.order_status}
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
                          {moment(orderAd?.created_at).format(
                            "hh:mm A MM-DD-YYYY"
                          )}
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
                          onClick={() =>
                            navigate(`/order-placed/${orderAd?._id}`)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
              </table>
              <div className="text-center">
                {loading && <CircularProgress />}
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default MyOrders;
