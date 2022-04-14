import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
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
    color: "#333333",
    fontWeight: 600,
    fontSize: 28,
  },
  subtitle: {
    color: "#333333",
    fontWeight: 400,
    fontSize: 16,
  },
  label: {
    color: "#c4c4c4",
    fontWeight: 500,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#E0077D",
    padding: "5px 15px 5px 15px",
    color: "white",
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
    color: "#DF097C",
  },
  otherText: {
    fontSize: 14,
    fontWeight: 400,
  },
}));

function MyOrders() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box mt={5} p={2}>
      <Box>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.title}
        >
          My Orders
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.subtitle}
        >
          Manage your complete and pending orders
        </Typography>
      </Box>
      <div className={classes.infoCard}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <div className={classes.orderTab}>Pending</div>
          <div className={classes.orderTabSelected}>Completed</div>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
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
            <tr className={classes.tr}>
              <td className={classes.userText} style={{ width: "15%" }}>
                BTC/INR
              </td>
              <td className={classes.otherText} style={{ width: "15%" }}>
                0.13
              </td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Buy</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>BTC/INR</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Buy</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                {" "}
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>ETH/INR</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Sell</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                {" "}
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>BTC/INR</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Buy</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                {" "}
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>BTC/INR</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Buy</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                {" "}
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>BTC/INR</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Buy</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                {" "}
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
            <tr className={classes.tr}>
              <td className={classes.userText}>BTC/INR</td>
              <td className={classes.otherText}>0.13</td>
              <td className={classes.otherText}>35,34,400</td>
              <td className={classes.otherText}>Buy</td>
              <td className={classes.otherText}>04, April 2022</td>
              <td className={classes.otherText}>
                {" "}
                <Button
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#E0077D",
                    padding: "5px 20px 5px 20px",
                    color: "white",
                  }}
                >
                  View Order
                </Button>
              </td>
            </tr>
          </table>
        </Box>
      </Box>
    </Box>
  );
}

export default MyOrders;
