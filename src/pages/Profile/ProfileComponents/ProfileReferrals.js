import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../actions/profileActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircle } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  infoCard: {
    marginTop: 20,
    marginBottom: 20,

    height: "100%",
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 20,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  label: {
    color: "#333333",
    fontWeight: 600,
    fontSize: 14,
  },

  submitButton: {
    borderRadius: 10,
    backgroundColor: "#E0077D",
    padding: "5px 15px 5px 15px",
    color: "white",
  },
  heading: {
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: "1px solid rgba(145, 145, 145, 0.2)",
    color: "#333333",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },
  labelWrapper: {
    borderBottom: "1px solid #eeeeee",
    padding: 7,
    paddingTop: 15,
    backgroundColor: "#FFFFFF",
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    padding: "7px 15px 7px 15px",
    marginRight: 7,
    color: "white",
    border: "none",
  },
}));

function ProfileReferrals() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.infoCard}>
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.heading}
        style={{ fontWeight: 600 }}
      >
        Referrals
      </Typography>
      <Typography align="center" fontWeight={400} mt={3}>
        Will be available soon.
      </Typography>
    </div>
  );
}

export default ProfileReferrals;
