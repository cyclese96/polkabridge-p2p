import React from "react";
import { makeStyles } from "@mui/styles";
import PriceCard from "./components/PriceCard";
import { Box, useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  filterCard: {
    marginTop: 20,
    marginBottom: 20,
    height: 200,
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 10,
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
        <div className={classes.filterCard}>Buy and Sell card</div>
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
