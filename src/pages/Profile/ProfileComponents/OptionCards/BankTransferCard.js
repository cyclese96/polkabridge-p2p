import { CircularProgress, Typography } from "@mui/material";
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

function BankTransferCard({ paymentOption, handleUpdate, paymentMode }) {
  const classes = useStyles();

  // Panel states
  const [expanded, setExpanded] = React.useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormField] = useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const loading = useSelector((state) => state?.profile?.profile?.loading);

  const isNewEntry = useMemo(() => {
    return !paymentOption;
  }, [paymentOption]);

  const onEdit = useCallback(() => {
    setEditMode(true);
    setFormField({
      ac_holder_name: paymentOption?.ac_holder_name,
      bank_name: paymentOption?.bank_name,
      account_number: paymentOption?.account_number,
      ifsc_code: paymentOption?.ifsc_code,
    });
  }, [paymentOption, editMode, setEditMode]);

  const onUpdate = useCallback(async () => {
    if (
      formFields?.account_number !== formFields?.account_number2 &&
      isNewEntry
    ) {
      console.log("acc number not same");
      return;
    }

    // validations of form fields

    const payload = isNewEntry
      ? {
          ac_holder_name: formFields?.ac_holder_name,
          bank_name: formFields?.bank_name,
          account_number: formFields?.account_number,
          ifsc_code: formFields?.ifsc_code,
          payment_mode: paymentMode,
        }
      : {
          _id: paymentOption?._id,
          ac_holder_name: formFields?.ac_holder_name,
          bank_name: formFields?.bank_name,
          account_number: formFields?.account_number,
          ifsc_code: formFields?.ifsc_code,
          payment_mode: paymentMode,
        };

    console.log("payload", payload);
    setEditMode(false);

    handleUpdate(payload);
  }, [formFields, isNewEntry, handleUpdate, editMode, setEditMode]);

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
          Bank Transfer {"(" + paymentMode + ")"}
          <span hidden={!paymentOption}>
            <CheckCircle style={{ color: "#4caf50" }} />
          </span>
        </Typography>
      </AccordionSummary>
      <>
        {!editMode && (
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
                <Typography align="start" fontWeight={400}>
                  {paymentOption?.ac_holder_name}
                </Typography>
              </div>
            </div>{" "}
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  Bank Name:
                </label>
              </div>
              <div class="col-md-9">
                <Typography align="start" fontWeight={400}>
                  {paymentOption?.bank_name}
                </Typography>
              </div>
            </div>{" "}
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  Account Number:
                </label>
              </div>
              <div class="col-md-9">
                <Typography align="start" fontWeight={400}>
                  {paymentOption?.account_number}
                </Typography>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  IFSC Code:
                </label>
              </div>
              <div class="col-md-9">
                <Typography align="start" fontWeight={400}>
                  {paymentOption?.ifsc_code}
                </Typography>
              </div>
            </div>
            <div class="text-center mt-4">
              {loading ? (
                <CircularProgress />
              ) : (
                <button className={classes.submitButton} onClick={onEdit}>
                  Edit
                </button>
              )}
            </div>
          </AccordionDetails>
        )}
        {editMode && (
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
                    setFormField({
                      ...formFields,
                      ac_holder_name: e.target.value,
                    });
                  }}
                  value={formFields?.ac_holder_name}
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
                  Bank Name:
                </label>
              </div>
              <div class="col-md-9">
                <input
                  onChange={(e) => {
                    setFormField({ ...formFields, bank_name: e.target.value });
                  }}
                  value={formFields?.bank_name}
                  type="text"
                  class="form-control input-p2p"
                  id="inputEmail4"
                  placeholder="Bank Name"
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
                    setFormField({
                      ...formFields,
                      account_number: e.target.value,
                    });
                  }}
                  value={formFields?.account_number}
                  type="text"
                  class="form-control input-p2p"
                  placeholder="Enter Account Number"
                />
              </div>
            </div>
            {isNewEntry && (
              <div class="row mt-3">
                <div class="col-md-3">
                  <label for="inputEmail4" className={classes.label}>
                    Re-enter Account Number:
                  </label>
                </div>
                <div class="col-md-9">
                  <input
                    onChange={(e) => {
                      setFormField({
                        ...formFields,
                        account_number2: e.target.value,
                      });
                    }}
                    value={formFields?.account_number2}
                    type="text"
                    class="form-control input-p2p"
                    placeholder="Re-enter Account Number"
                  />
                </div>
              </div>
            )}
            <div class="row mt-3">
              <div class="col-md-3">
                <label for="inputEmail4" className={classes.label}>
                  IFSC Code:
                </label>
              </div>
              <div class="col-md-9">
                <input
                  onChange={(e) => {
                    setFormField({ ...formFields, ifsc_code: e.target.value });
                  }}
                  value={formFields?.ifsc_code}
                  type="text"
                  class="form-control input-p2p"
                  placeholder="Enter ifsc code"
                />
              </div>
            </div>
            <div class="text-center mt-4">
              {loading ? (
                <CircularProgress />
              ) : (
                <button className={classes.submitButton} onClick={onUpdate}>
                  Update Payment
                </button>
              )}
            </div>
          </AccordionDetails>
        )}
      </>
    </Accordion>
  );
}

export default BankTransferCard;
