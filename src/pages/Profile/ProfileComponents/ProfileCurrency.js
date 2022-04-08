import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";

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
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
  },
  labelWrapper: {
    borderBottom: "1px solid #eeeeee",
    padding: 7,
    paddingTop: 15,
    backgroundColor: "#FFFFFF",
  },
}));

function ProfileCurrency() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.infoCard}>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.heading}
      >
        Select your preferred currency
      </Typography>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              RUPEE (INR)
            </Typography>
          </Box>
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
                backgroundColor: "green",
              }}
            ></div>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              Euro (EUR)
            </Typography>
          </Box>
          <Box pl={2}>
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: "50%",
                border: "1px solid #919191",
              }}
            ></div>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              Renminbi (CNY)
            </Typography>
          </Box>
          <Box pl={2}>
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: "50%",
                border: "1px solid #919191",
              }}
            ></div>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              Vietnamese dong (VND)
            </Typography>
          </Box>
          <Box pl={2}>
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: "50%",
                border: "1px solid #919191",
              }}
            ></div>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              United States Dollar (USD)
            </Typography>
          </Box>
          <Box pl={2}>
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: "50%",
                border: "1px solid #919191",
              }}
            ></div>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              US DOLLAR (USD)
            </Typography>
          </Box>
          <Box pl={2}>
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: "50%",
                border: "1px solid #919191",
              }}
            ></div>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={3}
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
              SINGAPORE DOLLAR (SGD)
            </Typography>
          </Box>
          <Box pl={2}>
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: "50%",
                border: "1px solid #919191",
              }}
            ></div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProfileCurrency;
