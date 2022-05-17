import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "10%",
  },
  heading: {
    fontWeight: 600,
    fontSize: 32,
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
    letterSpacing: "-0.02em",
    color: "#414141",
    textAlign: "center",
    lineHeight: 1.5,
  },

  title: {
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  description: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
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
  },
  buttonSecond: {
    width: "fit-content",
    color: "white",
    backgroundColor: "#6A55EA",
    padding: "12px 50px 12px 50px",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "80%",
    border: "1px solid #eeeeee",

    paddingTop: 30,
    paddingBottom: 30,
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

export default function HowItWorks() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box>
      <Box className={classes.background}>
        <h1 variant="h1" className={classes.heading}>
          How P2P Works
        </h1>
        <div className="d-flex justify-content-center">
          <p className={classes.para} style={{ width: "50%" }}>
            PolkaBridge P2P helps you convert your money to crypto instantly
            where PolkaBridge acts as an escrow for safekeeping of the
            transaction.
          </p>
        </div>

        <Container style={{ marginTop: 30 }}>
          <div className="d-flex justify-content-evenly">
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              mt={3}
              mb={5}
            >
              <Box
                px={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                width={200}
              >
                <div style={{ height: 100 }}>
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/finance-4996087-4159684.png"
                    style={{ height: 80 }}
                  />
                </div>
                <h1 variant="h1" className={classes.title}>
                  STEP 1
                </h1>
                <Typography variant="body2" className={classes.description}>
                  Create Order and Deposit Tokens
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              mt={3}
              mb={5}
            >
              <Box
                px={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                width={200}
              >
                <div style={{ height: 100 }}>
                  <img src="/images/bank.png" style={{ height: 80 }} />
                </div>

                <h1 variant="h1" className={classes.title}>
                  STEP 2
                </h1>
                <Typography variant="body2" className={classes.description}>
                  Pay directly to seller account
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              mt={3}
              mb={5}
            >
              <Box
                px={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                width={200}
              >
                <div style={{ height: 100 }}>
                  <img src="/images/wallet.png" style={{ height: 80 }} />
                </div>

                <h1 variant="h1" className={classes.title}>
                  STEP 3
                </h1>
                <Typography variant="body2" className={classes.description}>
                  We will release tokens to buyer
                </Typography>
              </Box>
            </Box>
          </div>
        </Container>
      </Box>
    </Box>
  );
}
