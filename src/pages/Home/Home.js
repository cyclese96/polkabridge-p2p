import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import OrderTable from "./components/OrderTable";
import HowItWorks from "../../common/HowItWorks";
import { useDispatch, useSelector } from "react-redux";
import Pusher from "pusher-js";
import { getLatestOrders } from "../../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url("images/tokens.png"), linear-gradient(180deg, #ffffff 0%, #d9e8fc 100%)`,
    // backgroundImage: 'url("images/network.png"), url(images/tokens.png)',
    // backgroundImage: " url(images/tokens.png)",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "contain",
    height: "100%",
    width: "100%",
    paddingTop: "3%",
  },
  mainHeading: {
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  buttonFirst: {
    width: "fit-content",
    color: "#212121",
    backgroundColor: "#eeeeee",
    padding: "12px 50px 12px 50px",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    cursor: "pointer",
  },
  buttonSecond: {
    width: "fit-content",
    color: "white",
    backgroundColor: "#6A55EA",
    padding: "12px 50px 12px 50px",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    cursor: "pointer",
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
  cardTitle: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "left",
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { fiats, tokens, payments, orders } = store.order;
  const [pageNumber, setPageNumber] = useState(1);
  const [orderType, setOrderType] = useState("buy");
  const [fiat, setFiat] = useState("INR");
  const [token, setToken] = useState("All");
  const [payment, setPayment] = useState("All");

  const authenticatedUser = useSelector((state) => state?.user);
  const orderLoading = useSelector((state) => state?.order?.orderLoading);

  const selectedFiat = useMemo(() => {
    const fiatObject = fiats?.find((item) => item?.fiat === fiat);
    if (!fiatObject) {
      return { _id: null };
    }
    return fiatObject;
  }, [fiats, fiat]);

  const selectedToken = useMemo(() => {
    const tokenObject = tokens?.find((item) => item?.symbol === token);
    if (!tokenObject) {
      return { _id: null };
    }
    return tokenObject;
  }, [tokens, token]);

  const filter = useMemo(() => {
    const filterObject = {
      order_type: orderType === "sell" ? "buy" : "sell",
      fiat: selectedFiat?._id,
      token: selectedToken?._id,
      payment_option: payment === "All" ? null : payment,
    };
    return filterObject;
  }, [orderType, selectedFiat, selectedToken, payment]);

  useEffect(() => {
    if (!filter || !authenticatedUser?.jwtToken) {
      return;
    }
    dispatch(getLatestOrders(pageNumber, filter, authenticatedUser?.jwtToken));
  }, [filter, pageNumber, authenticatedUser]);

  return (
    <Box className={classes.background}>
      <Box>
        <Typography
          variant="body2"
          fontSize={24}
          textAlign="center"
          fontWeight={600}
          color={"#414141"}
        >
          Decentalized P2P Exchange
        </Typography>
        <Typography
          variant="body2"
          fontSize={14}
          textAlign="center"
          fontWeight={400}
          color={"#757575"}
        >
          Experience first decentralized P2P trading with PolkaBridge
        </Typography>
        <Container style={{ marginTop: 40 }}>
          <Box className={classes.buttonWrapper}>
            <Box
              className={classes.buttonFirst}
              style={{
                backgroundColor: orderType === "buy" ? "#6A55EA" : "#eeeeee",
                color: orderType === "buy" ? "white" : "#212121",
              }}
              onClick={() => setOrderType("buy")}
            >
              Buy
            </Box>
            <Box
              className={classes.buttonSecond}
              style={{
                backgroundColor: orderType === "sell" ? "#6A55EA" : "#eeeeee",
                color: orderType === "sell" ? "white" : "#212121",
              }}
              onClick={() => setOrderType("sell")}
            >
              Sell
            </Box>
          </Box>
          <div className="d-flex justify-content-center">
            <div className={classes.filterCard}>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                mt={3}
              >
                <Box px={2}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Fiat
                    </InputLabel>

                    <Select
                      variant="standard"
                      disableUnderline={true}
                      value={fiat}
                      label="Age"
                      style={{
                        fontWeight: 600,
                        letterSpacing: 1,
                        color: "#212121",
                      }}
                      onChange={(e) => setFiat(e?.target?.value)}
                    >
                      {fiats.map((item, index) => (
                        <MenuItem value={item.fiat}>{item.fiat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <div
                  style={{ borderLeft: "1px solid #EAECEE", height: 60 }}
                ></div>
                <Box px={2}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Payment Mode
                    </InputLabel>

                    <Select
                      variant="standard"
                      disableUnderline={true}
                      value={payment}
                      label="Age"
                      style={{
                        fontWeight: 600,
                        letterSpacing: 1,
                        color: "#212121",
                      }}
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      {payments.map((item, index) => (
                        <MenuItem value={item.provider}>
                          {item.provider.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <div
                  style={{ borderLeft: "1px solid #EAECEE", height: 60 }}
                ></div>
                <Box px={2}>
                  {/* <Button
                    onClick={handleApplyFilters}
                    style={{
                      borderRadius: 10,
                      background: "#6A55EA",
                      padding: "9px 35px 9px 35px",
                      color: "white",
                    }}
                  >
                    Filter Orders
                  </Button> */}
                </Box>
              </Box>
            </div>
          </div>
        </Container>
      </Box>
      <Container>
        <OrderTable orders={orders} />
        <div className="text-center">
          {orderLoading && <CircularProgress />}
        </div>
      </Container>
      <Container>
        <HowItWorks />
      </Container>
    </Box>
  );
}
