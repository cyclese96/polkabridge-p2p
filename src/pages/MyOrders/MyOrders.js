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
import { fromWei } from "../../utils/helper";
import { getUserTrades } from "../../actions/tradeActions";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../../actions/orderActions";
import moment from "moment";
import useParsedQueryString from "../../hooks/useParsedQueryString";

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

  const [pageNumber, setPageNumber] = useState(1);
  const [orderType, setOrderType] = useState("all");
  const [token, setToken] = useState("All");
  const [orderStatus, setorderStatus] = useState("pending");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state?.user);
  const loading = useSelector((state) => state?.userTrade?.fetchTradeLoading);
  const pendingTrades = useSelector((state) => state?.userTrade?.trades);
  const tokens = useSelector((state) => state?.order?.tokens);

  const userAds = useSelector((state) => state?.order?.userOrders);

  const parsedQuery = useParsedQueryString();

  const currentTab = useMemo(() => {
    const page = parsedQuery.page;
    if (page === "ads") {
      return 0;
    } else if (page === "pending-orders") {
      return 1;
    } else if (page === "all-orders") {
      return 2;
    } else {
      return 0;
    }
  }, [parsedQuery]);

  useEffect(() => {
    console.log("user ads", userAds);
  }, [userAds]);
  useEffect(() => {
    if (!authState?.id) {
      return;
    }

    //: add filters
    if (currentTab === 0) {
      dispatch(
        getUserOrders(1, { ...{}, user: authState?.id }, authState?.jwtToken)
      );
    }

    dispatch(getUserTrades(authState?.jwtToken, orderType, orderStatus));
  }, [authState, orderType, orderStatus, currentTab]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/my-orders?page=ads");
    } else if (newValue === 1) {
      navigate("/my-orders?page=pending-orders");
    } else {
      navigate("/my-orders?page=all-orders");
    }
  };

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
              value={currentTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value={0} label="My Ads" />
              <Tab value={1} label="Processing" />
              <Tab value={2} label="All Orders" />
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
                  {currentTab !== 2 && (
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

                {[1, 2].includes(currentTab) &&
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
                          authState?.id?.toString()
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
                            navigate(`/order-waiting/${item?._id}`)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                {/* my ads */}
                {[0].includes(currentTab) &&
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
                          onClick={() => navigate(`/my-orders/${orderAd?._id}`)}
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
