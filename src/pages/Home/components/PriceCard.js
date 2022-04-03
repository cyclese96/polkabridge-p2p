import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 130,
    width: 250,
    border: "1px solid #212121",
    padding: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  cardTitle: {
    fontFamily: "Work Sans",
    textAlign: "left",
    fontWeight: 500,
    fontSize: 24,
    lineHeight: "33px",
    color: "#333333",
  },
  subtitle: {
    fontFamily: "Work Sans",
    textAlign: "left",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: "16px",
    color: "#E0077D",
  },
  price: {
    fontFamily: "Work Sans",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: "26px",
    color: "#333333",
  },
  text: {
    fontFamily: "Work Sans",
    textAlign: "left",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: "16px",
    color: "#919191",
  },
}));

export default function PriceCard() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Box>
        <Box display="flex" justifyContent="flex-start">
          <Box>
            <img
              src="https://polkawar.com/assets/logo.png"
              height="30px"
              style={{ paddingRight: 5 }}
            />
          </Box>

          <Box>
            <Typography variant="title" className={classes.cardTitle}>
              PolkaWar
            </Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
              PWAR/INR
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" className={classes.price}>
            44,236 INR
          </Typography>
          <Typography variant="subtitle2" className={classes.text}>
            Available Market Price
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
