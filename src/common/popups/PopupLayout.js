import React, { useState, useEffect } from "react";
import { Box, Dialog, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Close } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  popup: {
    minHeight: 400,
    maxHeight: 400,
    minWidth: 750,
    maxWidth: 750,
    margin: "0 auto",
    display: "grid",
    placeItems: "center",
    [theme.breakpoints.down("md")]: {
      minWidth: "100%",
    },
  },
}));

const PopupLayout = ({ children, popupActive, resetPopup }) => {
  const classes = useStyles();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    resetPopup();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={popupActive}
      maxWidth="md"
    >
      <Box
        border="10px solid #D1FF1A"
        px={!sm ? "2vw" : "5%"}
        py={!sm ? "5vh" : "10%"}
        className={classes.popup}
      >
        <Box style={{ position: "absolute", right: "15px", top: "15px" }}>
          <Close
            style={{ color: "black", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
        {children}
      </Box>
    </Dialog>
  );
};

export default PopupLayout;
