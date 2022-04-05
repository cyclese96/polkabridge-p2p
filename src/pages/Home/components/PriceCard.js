import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 130,
    width: 250,
    border: "1px solid #eeeeee",
    padding: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    // filter: "drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.13))",
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

export default function PriceCard({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <Box>
        <Box display="flex" justifyContent="flex-start">
          <Box>
            <div
              style={{
                backgroundColor: data.backgroundColor,
                borderRadius: "50%",
                height: "44px",
                width: "44px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={data.logo} height="30px" />
            </div>
          </Box>

          <Box pl={2}>
            <Typography variant="title" className={classes.cardTitle}>
              {data.name}
            </Typography>
            <Typography
              variant="subtitle2"
              className={classes.subtitle}
              style={{ color: data.color }}
            >
              {data.token}/INR
            </Typography>
          </Box>
        </Box>
        <Box mt={2} pl={2}>
          <Typography variant="subtitle2" className={classes.price}>
            {data.price} INR
          </Typography>
          <Typography variant="subtitle2" className={classes.text}>
            Available Market Price
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
