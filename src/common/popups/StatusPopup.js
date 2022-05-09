import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    height: "max-content",
    height: 400,
    minHeight: 350,
    maxWidth: 788,
    position: "relative",
    background: "#fff",
    border: "10px solid #D1FE1D",
    padding: 20,
    borderRadius: 4,
    zIndex: 11,
    [theme.breakpoints.down("md")]: {
      padding: "25px 5%",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  inputWrapper: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  input: {
    backgroundColor: "#ffffff",
    border: "1px solid #757575",
    borderRadius: 18,
    width: "80%",
    padding: 6,
    outline: "none",
    color: "#212121",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontFamily: "Karla",
  },
  heading: {
    paddingTop: 30,
    color: "#000000",
    textAlign: "center",
    fontSize: 30,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      fontSize: 20,
    },
  },

  para: {
    color: "#212121",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 400,
    fontFamily: "Karla",
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
  },

  connectButton: {
    width: "fit-content",
    height: "45px",
    background: "#FFB469",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "10px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 700,
    marginTop: 20,
    padding: "12px 50px 12px 50px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  registerButton: {
    width: "fit-content",
    height: "45px",
    background: "#FF87FF",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    borderRadius: "20px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#000000",

    marginTop: 20,
    padding: "12px 30px 12px 30px",
    "&:hover": {
      background: "#FFB469",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },

  svgImage: {
    width: 100,
    [theme.breakpoints.down("md")]: {
      width: 70,
    },
  },
  spoon1Image: {
    width: 40,
    height: "fit-content",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  spoon2Image: {
    width: 30,
    height: "fit-content",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  iconWrapper: {
    marginRight: 10,
    backgroundColor: "#FF87FF",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
  },
  icon: {
    width: 25,
    height: 25,
    color: "white",
  },
}));

const StatusPopup = ({ popupActive, disablePopup }) => {
  const classes = useStyles();

  const resetPopup = () => {
    disablePopup();
  };
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="d-flex flex-column justify-content-around">
          <div className="mt-3">
            <Typography variant="h2" className={classes.heading}>
              Oops ! You are not whitelisted.
            </Typography>
            <Typography variant="h5" className={classes.para}>
              SIGN UP WITH YOUR WALLET ADDRESS TO GET ACCESS.
            </Typography>
          </div>

          <div className="mt-4">
            <div className="text-center my-4">
              <img
                src="./images/cross_spoon.png"
                className={classes.svgImage}
              />
            </div>
          </div>
          <div className="text-center">
            <a
              href="https://gleam.io/lcue1/onerare-testnet-whitelist-100k-orare-in-rewards"
              target="_blank"
            >
              <Button
                className={classes.connectButton}
                onClick={resetPopup}
                style={{ color: "black", backgroundColor: "#00FFFF" }}
              >
                REGISTER NOW
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;
