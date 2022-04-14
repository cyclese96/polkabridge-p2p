import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 30,
    backgroundColor: "#FFFFFF",

    boxShadow: "0px 12px 24px rgba(245, 0, 162, 0.08)",
    borderRadius: "30px",
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
    minWidth: 120,
    textAlign: "center",
  },
  orderTabSelected: {
    backgroundColor: "#DF097C",
    padding: "5px 15px 5px 15px",
    color: "white",
    fontWeight: 600,
    minWidth: 120,
    textAlign: "center",
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
  label: {
    color: "#616161",
    fontWeight: 500,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#E0077D",
    padding: "5px 15px 5px 15px",
    color: "white",
  },
  orderBox: {
    border: "1px solid #eeeeee",
    padding: 20,
    borderRadius: "30px",
  },
  para: {
    paddingTop: 10,
    color: "#757575",
    fontSize: 14,
  },
  iconTitle: {
    paddingTop: 20,
    color: "#333333",
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
  },
  iconSubtitle: {
    color: "#757575",
    fontSize: 14,
    textAlign: "center",
  },
  icon: {
    height: 100,
  },
  howTitle: {
    color: "#333333",
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    minWidth: 140,
  },
  howSubtitle: {
    width: 600,
    color: "#757575",
    fontSize: 15,
    fontWeight: 400,
    textAlign: "center",
  },
  overviewCard: {
    marginTop: 20,
    width: "400px",
    height: "100%",
    border: "1px solid #eeeeee",
    padding: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  overviewTitle: {
    color: "#757575",
    fontSize: 15,
    fontWeight: 400,
    textAlign: "left",
  },
  overviewValue: {
    color: "#333333",
    fontSize: 15,
    fontWeight: 400,
    textAlign: "left",
    minWidth: 150,
  },
}));

function OrderPlaced() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box mt={4} p={2}>
      <div className={classes.infoCard}>
        <Box>
          <Box mt={2}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.howTitle}
            >
              Order Created
            </Typography>
            <div className="d-flex justify-content-center">
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.howSubtitle}
              >
                Your buy order has been placed successfully and added into order
                book. Keep an eye on sellers.
              </Typography>
            </div>
            <div className="text-center mb-3">
              <img src="check-mark.png" className={classes.icon} />
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.howTitle}
            >
              Waiting for seller connect!
            </Typography>
          </Box>
          <div className="d-flex justify-content-center">
            <Box className={classes.overviewCard}>
              <div className="row justify-content-center mt-2">
                <div className="col-md-4">
                  {" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.overviewTitle}
                  >
                    Amount
                  </Typography>
                </div>
                <div className="col-md-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.overviewValue}
                  >
                    0.32 BTC
                  </Typography>
                </div>
              </div>
              <div className="row justify-content-center  mt-2">
                <div className="col-md-4">
                  {" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.overviewTitle}
                  >
                    Total Price
                  </Typography>
                </div>
                <div className="col-md-4">
                  {" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.overviewValue}
                  >
                    50,000 INR
                  </Typography>
                </div>
              </div>
              <div className="row justify-content-center mt-2">
                <div className="col-md-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.overviewTitle}
                  >
                    Overview
                  </Typography>
                </div>
                <div className="col-md-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.overviewValue}
                  >
                    04 Hours
                  </Typography>
                </div>
              </div>
            </Box>
          </div>
          <div className="text-center mt-3 mb-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E0077D",
                  padding: "5px 20px 5px 20px",

                  color: "white",
                }}
              >
                Go back
              </Button>
            </Link>
          </div>
        </Box>
      </div>
    </Box>
  );
}

export default OrderPlaced;
