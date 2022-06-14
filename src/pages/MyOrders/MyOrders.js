import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
            My Profile
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.subtitle}
          >
            Update your proference for smooth trading experience.
          </Typography>
        </Box>
        <Box mt={4}>
          <Container style={{ marginTop: 10 }}>
            <div className="d-flex justify-content-center">
              <div className={classes.filterCard}>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  mt={3}
                >
                  <Box px={2}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Order Type
                      </InputLabel>

                      <Select
                        variant="standard"
                        disableUnderline={true}
                        value={orderType}
                        label="Age"
                        style={{
                          fontWeight: 600,
                          letterSpacing: 1,
                          color: "#212121",
                        }}
                        onChange={(e) => setOrderType(e?.target?.value)}
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="buy">Buy</MenuItem>
                        <MenuItem value="sell">Sell</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <div
                    style={{ borderLeft: "1px solid #EAECEE", height: 60 }}
                  ></div>
                  <Box px={2}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Token
                      </InputLabel>

                      <Select
                        variant="standard"
                        disableUnderline={true}
                        value={token}
                        label="Age"
                        style={{
                          fontWeight: 600,
                          lßtterSpacing: 1,
                          color: "#212121",
                        }}
                        onChange={(e) => setToken(e.target.value)}
                      >
                        {[{ symbol: "All" }, ...tokens].map((item, index) => (
                          <MenuItem value={item.symbol}>{item.symbol}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <div
                    style={{ borderLeft: "1px solid #EAECEE", height: 60 }}
                  ></div>
                  <Box px={2}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Status
                      </InputLabel>

                      <Select
                        variant="standard"
                        disableUnderline={true}
                        value={orderStatus}
                        label="Age"
                        style={{
                          fontWeight: 600,
                          letterSpacing: 1,
                          color: "#212121",
                        }}
                        onChange={(e) => setorderStatus(e.target.value)}
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <div
                    style={{ borderLeft: "1px solid #EAECEE", height: 60 }}
                  ></div>
                  <Box px={2}>
                    <Button
                      onClick={handleApplyFilters}
                      style={{
                        borderRadius: 10,
                        background: "#6A55EA",
                        padding: "9px 35px 9px 35px",
                        color: "white",
                      }}
                    >
                      Find Orders
                    </Button>
                  </Box> */}
                </Box>
              </div>
            </div>
          </Container>
          {/* <div className={classes.infoCard}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <div className={classes.orderTab}>Pending</div>
              <div className={classes.orderTabSelected}>Completed</div>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={3}
            >
              <Box px={2}>
                <select class="form-select" aria-label="Default select example">
                  <option selected>All Tokens</option>
                  <option value="1">BTC</option>
                  <option value="2">ETH</option>
                  <option value="3">PBR</option>
                </select>
              </Box>
              <Box px={2}>
                <select class="form-select" aria-label="Default select example">
                  <option selected>All Type</option>
                  <option value="1">Buy</option>
                  <option value="2">Sell</option>
                </select>
              </Box>
              <Box px={2}>
                <select class="form-select" aria-label="Default select example">
                  <option selected>All Payments</option>
                  <option value="1">UPI</option>
                  <option value="2">Online</option>
                  <option value="3">Cash</option>
                </select>
              </Box>

              <div className="px-2">
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: theme.palette.primary.main,
                    padding: "5px 20px 5px 20px",

                    color: "white",
                  }}
                >
                  Find Orders
                </Button>
              </div>
            </Box>
          </div> */}
          <Box>
            <Box className={classes.tableCard}>
              <table className={classes.table}>
                <tr className={classes.tr}>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Order Type</th>
                  <th>Date</th>

                  <th>Actions</th>
                </tr>

                {userOrders?.map((item) => (
                  <tr className={classes.tr}>
                    <td className={classes.userText} style={{ width: "15%" }}>
                      {item?.token?.symbol}
                    </td>
                    <td className={classes.otherText} style={{ width: "15%" }}>
                      {fromWei(item?.pending_amount, item?.token?.decimals)}
                    </td>
                    <td className={classes.otherText}>
                      {item?.order_unit_price}
                    </td>
                    <td className={classes.otherText}>{item?.order_type}</td>
                    <td className={classes.otherText}>{item?.created_at}</td>
                    <td className={classes.otherText}>
                      <Button
                        style={{
                          borderRadius: 10,
                          backgroundColor: theme.palette.primary.main,
                          padding: "5px 20px 5px 20px",
                          color: "white",
                        }}
                      >
                        View Order
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
        </Box>
      </Container>
    </Box>
  );
}

export default MyOrders;
