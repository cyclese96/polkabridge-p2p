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
  username: {
    color: "#333333",
    fontWeight: 600,
    fontSize: 18,
  },
  address: {
    color: "#0C7ED0",
    fontWeight: 400,
    fontSize: 14,
  },
  label: {
    color: "#c4c4c4",
    fontWeight: 500,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#E0077D",
    padding: "5px 15px 5px 15px",
    color: "white",
  },
}));

function ProfileInfo() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.infoCard}>
      <Box display="flex" justifyContent="start" alignItems="center" pl={3}>
        <Box>
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147140.png"
            style={{ height: "65px" }}
          />
        </Box>
        <Box pl={2}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.username}
          >
            Tahir Ahmad
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.address}
          >
            0x874...4f6dB
          </Typography>
        </Box>
      </Box>
      <Box pt={3}>
        <div class="row mt-3">
          <div class="col-md-6">
            <label for="inputEmail4" className={classes.label}>
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              placeholder="First Name"
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" className={classes.label}>
              Last Name
            </label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <label for="inputEmail4" className={classes.label}>
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" className={classes.label}>
              Mobile
            </label>
            <input
              type="text"
              class="form-control"
              id="inputPassword4"
              placeholder="Mobile"
            />
          </div>
        </div>
        <div class="text-center mt-3">
          <Button
            variant="contained"
            style={{
              borderRadius: 10,
              backgroundColor: "#E0077D",
              padding: "5px 15px 5px 15px",
              marginRight: 7,
              color: "white",
            }}
          >
            Update profile
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default ProfileInfo;
