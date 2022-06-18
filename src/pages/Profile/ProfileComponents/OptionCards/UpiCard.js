import { Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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

  submitButton: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    padding: "8px 30px 8px 30px",
    color: "white",
    border: "none",
  },
}));

function UpiCard({ paymentOption, handleUpdate, paymentMode }) {
  const classes = useStyles();

  // Panel states
  const [expanded, setExpanded] = React.useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormField] = useState({});

  const userProfile = useSelector((state) => state?.profile?.profile);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onEdit = useCallback(() => {
    setEditMode(true);

    setFormField({
      upi_provider: paymentOption?.upi_provider,
      upi_id: paymentOption?.upi_id,
    });
  }, [paymentOption, editMode, setEditMode]);

  const isNewEntry = useMemo(() => {
    return !paymentOption;
  }, [paymentOption]);

  const onUpdate = useCallback(async () => {
    // validations of form fields

    const payload = isNewEntry
      ? {
          upi_provider: formFields?.upi_provider,
          upi_id: formFields?.upi_id,
          fiat: userProfile?.fiat?._id,
          payment_mode: paymentMode,
        }
      : {
          _id: paymentOption?._id,
          upi_provider: formFields?.upi_provider,
          upi_id: formFields?.upi_id,
          fiat: userProfile?.fiat?._id,
          payment_mode: paymentMode,
        };

    console.log("payload", payload);
    setEditMode(false);
    handleUpdate(payload);
  }, [
    formFields,
    userProfile,
    isNewEntry,
    handleUpdate,
    editMode,
    setEditMode,
  ]);

  return (
    <Accordion
      square={true}
      disableGutters={true}
      style={{
        backgroundColor: expanded === paymentMode ? "#ffffff" : "#f5f5f5",
      }}
      expanded={expanded === paymentMode}
      onChange={handleChange(paymentMode)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          UPI {"(" + paymentMode + ")"}
          <span hidden={!paymentOption}>
            <CheckCircle style={{ color: "#4caf50" }} />
          </span>
        </Typography>
      </AccordionSummary>
      <>
        {!editMode && (
          <AccordionDetails>
            <Typography align="center" fontWeight={600}>
              Add UPI transfer details
            </Typography>
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  UPI Provider:
                </label>
              </div>
              <div class="col-md-9">
                <Typography align="start" fontWeight={400}>
                  {paymentOption?.upi_provider}
                </Typography>
              </div>
            </div>{" "}
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  UPI ID:
                </label>
              </div>
              <div class="col-md-9">
                <Typography align="start" fontWeight={400}>
                  {paymentOption?.upi_id}
                </Typography>
              </div>
            </div>{" "}
            <div class="text-center mt-4">
              <button className={classes.submitButton} onClick={onEdit}>
                Edit
              </button>
            </div>
          </AccordionDetails>
        )}
        {editMode && (
          <AccordionDetails>
            <Typography align="center" fontWeight={600}>
              Add UPI Details
            </Typography>
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  UPI Provider:
                </label>
              </div>
              <div class="col-md-9">
                <input
                  onChange={(e) => {
                    setFormField({
                      ...formFields,
                      upi_provider: e.target.value,
                    });
                  }}
                  value={formFields?.upi_provider}
                  type="text"
                  class="form-control input-p2p"
                  id="inputEmail4"
                  placeholder="Ex. Phone Pay"
                />
              </div>
            </div>{" "}
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  UPI ID:
                </label>
              </div>
              <div class="col-md-9">
                <input
                  onChange={(e) => {
                    setFormField({
                      ...formFields,
                      upi_id: e.target.value,
                    });
                  }}
                  value={formFields?.upi_id}
                  type="text"
                  class="form-control input-p2p"
                  id="inputEmail4"
                  placeholder="UPI ID"
                />
              </div>
            </div>
            <div class="text-center mt-4">
              <button className={classes.submitButton} onClick={onUpdate}>
                Update Payment
              </button>
            </div>
          </AccordionDetails>
        )}
      </>
    </Accordion>
  );
}

export default UpiCard;
