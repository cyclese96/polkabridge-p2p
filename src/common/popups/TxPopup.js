import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";

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
    background: "linear-gradient(180deg, #FFFFFF 0%, #D9E8FC 100%)",
    border: "10px solid #6A55EA",
    padding: 10,
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
    color: "#212121",
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: "0.02em",
    textAlign: "center",
    marginBottom: 14,
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
    lineHeight: 1.5,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
  },

  connectButton: {
    width: "fit-content",
    height: "45px",
    background: "#6A55EA",
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

  svgImage: {
    width: "100%",
    height: "fit-content",
    maxHeight: 220,
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      maxHeight: 120,
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

const TxPopup = ({ popupActive, disablePopup, txCase }) => {
  const classes = useStyles();

  const resetPopup = () => {
    disablePopup();
  };
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="d-flex justify-content-end">
          <IconButton>
            <Close style={{ color: "#212121", fontSize: 28 }} />
          </IconButton>
        </div>
        {txCase === 1 && (
          <div
            className="row flex-row align-items-center justify-content-center mb-sm-4"
            align="center"
            style={{
              height: "75%",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div className="row">
              <div className="col-md-6 my-auto">
                <h4 className={classes.heading}>Waiting for confirmation</h4>
                <h6 className={classes.para}>
                  PLEASE CONFIRM THIS TRANSACTION <br />
                  INTO METAMASK POPUPUP.
                </h6>
              </div>

              <div className="col-md-6 my-auto">
                <div className="text-center">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/hourglass-4029229-3337928.png"
                    className={classes.svgImage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {txCase === 2 && (
          <div
            className="row flex-row align-items-center justify-content-center mb-sm-4"
            align="center"
            style={{
              height: "75%",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div className="row">
              <div className="col-md-6 my-auto">
                <h4 className={classes.heading}>Transaction Submitted</h4>
                <h6 className={classes.para}>
                  TRANSACTION HAS BEEN SUBMITTED AND <br />
                  WAITING FOR CONFIRMATION.
                </h6>
              </div>

              <div className="col-md-6 my-auto">
                <div className="text-center">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/check-setting-4810443-4003146.png"
                    className={classes.svgImage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {txCase === 3 && (
          <div
            className="row flex-row align-items-center justify-content-center mb-sm-4"
            align="center"
            style={{
              height: "75%",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div className="row">
              <div className="col-md-6 my-auto">
                <h4 className={classes.heading}>Transaction Successful!</h4>
                <h6 className={classes.para}>
                  GREAT! TRANSACTION HAS BEEN CONFIRMED SUCCESSFULLY.
                </h6>
              </div>

              <div className="col-md-6 my-auto">
                <div className="text-center">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/check-2872554-2389850.png"
                    className={classes.svgImage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {txCase === 4 && (
          <div
            className="row flex-row align-items-center justify-content-center mb-sm-4"
            align="center"
            style={{
              height: "75%",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div className="row">
              <div className="col-md-6 my-auto">
                <h4 className={classes.heading}>Transaction Failed!</h4>
                <h6 className={classes.para}>
                  WE HAVE ENCOUNTERED AN ERROR IN THIS TRANSACTION. PLEASE TRY
                  AGAIN.
                </h6>
              </div>

              <div className="col-md-6 my-auto">
                <div className="text-center">
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/warning-4958308-4124832.png"
                    className={classes.svgImage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TxPopup;
