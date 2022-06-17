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

function ProfilePayments() {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [confirmAccount, setConfirmAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [paytm, setPaytm] = useState("");
  const [upi, setUpi] = useState("");
  const [accountType, setAccountType] = useState("");

  // Panel states
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.infoCard}>
      {console.log(expanded)}
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.heading}
        style={{ fontWeight: 600 }}
      >
        Payment options
      </Typography>
      <Accordion
        square={true}
        disableGutters={true}
        style={{
          backgroundColor: expanded === "panel1" ? "#ffffff" : "#eeeeee",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Bank Transfer <CheckCircle style={{ color: "#4caf50" }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="center" fontWeight={600}>
            Add bank transfer details
          </Typography>
          <div class="row mt-3">
            <div class="col-md-3">
              <label for="inputEmail4" className={classes.label}>
                Name:
              </label>
            </div>
            <div class="col-md-9">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                class="form-control input-p2p"
                id="inputEmail4"
                placeholder="Account Holder Name"
              />
            </div>
          </div>{" "}
          <div class="row mt-3">
            <div class="col-md-3">
              <label for="inputEmail4" className={classes.label}>
                Account Number:
              </label>
            </div>
            <div class="col-md-9">
              <input
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
                value={account}
                type="text"
                class="form-control input-p2p"
                placeholder="Enter Account Number"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-3">
              <label for="inputEmail4" className={classes.label}>
                Re-enter Account Number:
              </label>
            </div>
            <div class="col-md-9">
              <input
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
                value={account}
                type="text"
                class="form-control input-p2p"
                placeholder="Re-enter Account Number"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-3">
              <label for="inputEmail4" className={classes.label}>
                IFSC Code:
              </label>
            </div>
            <div class="col-md-9">
              <input
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
                value={account}
                type="text"
                class="form-control input-p2p"
                placeholder="Enter ifsc code"
              />
            </div>
          </div>
          <div class="text-center mt-4">
            <button className={classes.submitButton}>Update Payment</button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square={true}
        disableGutters={true}
        style={{
          backgroundColor: expanded === "panel2" ? "#ffffff" : "#eeeeee",
        }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            UPI <CheckCircle style={{ color: "#4caf50" }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="center" fontWeight={600}>
            Add UPI details
          </Typography>
          <div class="row mt-3">
            <div class="col-md-3">
              <label for="inputEmail4" className={classes.label}>
                UPI Id:
              </label>
            </div>
            <div class="col-md-9">
              <input
                onChange={(e) => {
                  setUpi(e.target.value);
                }}
                value={upi}
                type="text"
                class="form-control input-p2p"
                placeholder="Enter paytm number"
              />
            </div>
          </div>
          <div class="text-center mt-4">
            <button className={classes.submitButton}>Update Payment</button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square={true}
        disableGutters={true}
        style={{
          backgroundColor: expanded === "panel3" ? "#ffffff" : "#eeeeee",
        }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Paytm</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography align="center" fontWeight={600}>
            Add Paytm details
          </Typography>
          <div class="row mt-3">
            <div class="col-md-3">
              <label for="inputEmail4" className={classes.label}>
                Paytm number:
              </label>
            </div>
            <div class="col-md-9">
              <input
                onChange={(e) => {
                  setPaytm(e.target.value);
                }}
                value={paytm}
                type="text"
                class="form-control input-p2p"
                placeholder="Enter paytm number"
              />
            </div>
          </div>
          <div class="text-center mt-4">
            <button className={classes.submitButton}>Update Payment</button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ProfilePayments;
