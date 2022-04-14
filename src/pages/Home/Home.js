import React from "react";
import { makeStyles } from "@mui/styles";
import PriceCard from "./components/PriceCard";
import { Box, Button, useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  filterCard: {
    marginTop: 20,
    marginBottom: 20,
    height: 200,
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  tableCard: {
    width: "100%",
    height: "100%",
    width: "100%",
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
  },
  userText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#345AE7",
  },
  otherText: {
    fontSize: 14,
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
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();

  let tokenData = [
    {
      name: "Bitcoin",
      price: "36,34,345",
      token: "BTC",
      backgroundColor: "#F7931A",
      color: "#F7931A",
      logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/1.png",
    },
    {
      name: "Ethereum",
      price: "6,34,345",
      token: "ETH",
      backgroundColor: "#627EEA",
      color: "#627EEA",
      logo: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png",
    },
    {
      name: "PolkaBridge",
      price: "54",
      token: "PBR",
      backgroundColor: "#e5e5e5",
      color: "#E0077D",
      logo: "https://polkabridge.org/images/symbol.png",
    },
    {
      name: "PolkaWar",
      price: "07",
      token: "PWAR",
      backgroundColor: "#e5e5e5",
      color: "#7D0445",
      logo: "https://polkawar.com/assets/logo.png",
    },
  ];
  return (
    <Box p={2} pt={4}>
      <h5 style={{ paddingLeft: 10 }}>Top Pools</h5>
      <div className="d-flex justify-content-start">
        {tokenData.map((singleData) => {
          return (
            <Box p={2}>
              <PriceCard data={singleData} />
            </Box>
          );
        })}
      </div>
      <Box p={2}>
        <div className={classes.filterCard}>
          {" "}
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
                  backgroundColor: "#E0077D",
                  padding: "5px 20px 5px 20px",

                  color: "white",
                }}
              >
                Find Orders
              </Button>
            </div>
          </Box>
        </div>
      </Box>

      <h5 style={{ paddingLeft: 10 }}>Market Orders</h5>
      <Box p={2}>
        <Box className={classes.tableCard}>
          <table className={classes.table}>
            <tr className={classes.tr}>
              <th>User</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>0x98...3234</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>UPI, Bank Transfer</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>Buy Now</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>0x98...3234</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>UPI, Bank Transfer</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>Buy Now</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>0x98...3234</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>UPI</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>Buy Now</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>0x98...3234</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>UPI, Bank Transfer</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>Buy Now</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>0x98...3234</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Paytm</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>Buy Now</td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>0x98...3234</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>UPI, Bank Transfer</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>Buy Now</td>
            </tr>
          </table>
        </Box>
      </Box>
    </Box>
  );
}
