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
    height: 50,
  },
  howTitle: {
    color: "#333333",
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
  },
  howSubtitle: {
    width: 600,
    color: "#757575",
    fontSize: 15,
    fontWeight: 400,
    textAlign: "center",
  },
}));

function CreateOrder() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box mt={4} p={2}>
      <Box>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.title}
        >
          Create New Order
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.subtitle}
        >
          Create a buy order for smooth P2P trading.
        </Typography>
      </Box>
      <div className={classes.infoCard}>
        <div className="row align-items-center">
          <div className="col-md-7">
            <div className={classes.orderBox}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <div className={classes.orderTab}>BUY</div>
                <div className={classes.orderTabSelected}>SELL</div>
              </Box>
              <Box pt={3}>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <label for="inputEmail4" className={classes.label}>
                      Price
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" className={classes.label}>
                      Amount
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <label for="inputEmail4" className={classes.label}>
                      Total
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="inputPassword4" className={classes.label}>
                      Payment Window
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                <div class="text-center mt-4">
                  <Link to="/order-placed" style={{ textDecoration: "none" }}>
                    <Button
                      style={{
                        borderRadius: 10,
                        backgroundColor: "#E0077D",
                        padding: "5px 15px 5px 15px",
                        marginRight: 7,
                        color: "white",
                      }}
                    >
                      Create Buy Order
                    </Button>
                  </Link>
                  <div className={classes.para}>
                    Your order will be posted in buy order list
                  </div>
                </div>
              </Box>
            </div>
          </div>
          <div className="col-md-5 justify-content-center" align="center">
            <img src="/create.png" style={{ width: "300px" }} />
          </div>
        </div>
      </div>

      <Box>
        <Box mt={5}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.howTitle}
          >
            How P2P Buy Order Works
          </Typography>
          <div className="d-flex justify-content-center">
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.howSubtitle}
            >
              PolkaBridge P2P helps you convert your money to crypto instantly
              where PolkaBridge acts as an escrow for safekeeping of the
              transaction.
            </Typography>
          </div>
        </Box>
        <Box display="flex" justifyContent={"space-around"} my={5}>
          <Box>
            <div className="text-center">
              <img src="create-icon.png" className={classes.icon} />
            </div>
            <div className="text-center mt-3">
              <Button
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E0077D",
                  padding: "5px 15px 5px 15px",
                  marginRight: 7,
                  color: "white",
                }}
              >
                Step 1
              </Button>
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.iconTitle}
            >
              Create Order
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.iconSubtitle}
            >
              You’ll be auto connected with a seller instantly
            </Typography>
          </Box>
          <Box>
            <div className="text-center">
              <img src="create-icon.png" className={classes.icon} />
            </div>
            <div className="text-center mt-3">
              <Button
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E0077D",
                  padding: "5px 15px 5px 15px",
                  marginRight: 7,
                  color: "white",
                }}
              >
                Step 2
              </Button>
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.iconTitle}
            >
              Transfer Fiat to Seller
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.iconSubtitle}
            >
              The seller will confirm your payment
            </Typography>
          </Box>
          <Box>
            <div className="text-center">
              <img src="create-icon.png" className={classes.icon} />
            </div>
            <div className="text-center mt-3">
              <Button
                style={{
                  borderRadius: 10,
                  backgroundColor: "#E0077D",
                  padding: "5px 15px 5px 15px",
                  marginRight: 7,
                  color: "white",
                }}
              >
                Step 3
              </Button>
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.iconTitle}
            >
              Escrow Amount Released
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.iconSubtitle}
            >
              Escrow amount will be released and order will be completed.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateOrder;
