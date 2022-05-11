import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../actions/profileActions";

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
    fontWeight: 500,
    fontSize: 14,
    paddingLeft: 10,
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

function ProfileCurrency() {
  const classes = useStyles();
  const theme = useTheme();

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { fiats } = store.order;

  const submitCurrency = () => {
    let tempObj = {
      fiat: fiats[selectedIndex]._id,
    };
    dispatch(updateUserProfile(tempObj));
  };

  return (
    <div className={classes.infoCard}>
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.heading}
        style={{ fontWeight: 600 }}
      >
        Select your preferred currency
      </Typography>
      {fiats.length > 0 && (
        <Box>
          {fiats.map((item, index) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pl={3}
              onClick={() => setSelectedIndex(index)}
              className={classes.labelWrapper}
            >
              <Box display="flex" justifyContent="start" alignItems="center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25473.png"
                  style={{ height: "15px" }}
                />{" "}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.label}
                >
                  {item.fiat_label} ({item.fiat})
                </Typography>
              </Box>
              {selectedIndex === index ? (
                <Box
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: "50%",
                    border: "1px solid #919191",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: 17,
                      width: 17,
                      borderRadius: "50%",
                      border: "1px solid #919191",
                      backgroundColor: "#81c784",
                    }}
                  ></div>
                </Box>
              ) : (
                <Box
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: "50%",
                    border: "1px solid #919191",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: 17,
                      width: 17,
                      borderRadius: "50%",
                      border: "1px solid #919191",
                      backgroundColor: "transparent",
                    }}
                  ></div>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
      <div class="text-center mt-4">
        <button className={classes.submitButton} onClick={submitCurrency}>
          Update currency
        </button>
      </div>
    </div>
  );
}

export default ProfileCurrency;
