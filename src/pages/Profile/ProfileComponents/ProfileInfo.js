import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../actions/profileActions";

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
    backgroundColor: theme.palette.primary.main,
    padding: "7px 15px 7px 15px",
    marginRight: 7,
    color: "white",
    border: "none",
  },
}));

function ProfileInfo() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const profile = useSelector((state) => state?.profile?.profile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (profile) {
      console.log("profile fetched", profile);
      setName(profile.name);
      setEmail(profile.email);
      setMobile(profile.phone);
    }
  }, [profile]);

  const submitProfile = () => {
    let tempObj = {
      name: name,
      phone: mobile,
      email: email,
    };
    dispatch(updateUserProfile(tempObj));
  };
  return (
    <div className={classes.infoCard}>
      <Box display="flex" justifyContent="start" alignItems="center" pl={3}>
        <Box>
          <img
            src="https://mui.com/static/images/avatar/2.jpg"
            style={{ height: "65px", borderRadius: 50 }}
          />
        </Box>
        <Box pl={2}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.username}
            fontWeight={600}
          >
            {profile?.name}
          </Typography>
          <Typography
            variant="body2"
            color="#0C7ED0"
            className={classes.address}
            fontWeight={400}
            fontSize={14}
          >
            {profile?.wallet_address}
          </Typography>
        </Box>
      </Box>
      <Box pt={3}>
        <div class="row mt-3">
          <div class="col-md-12">
            <label for="inputEmail4" className={classes.label}>
              Full Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              value={name}
              class="form-control"
              id="inputEmail4"
              placeholder="Full Name"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <label for="inputEmail4" className={classes.label}>
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
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
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              value={mobile}
              type="text"
              class="form-control"
              placeholder="Mobile"
            />
          </div>
        </div>
        <div class="text-center mt-4">
          <button className={classes.submitButton} onClick={submitProfile}>
            Update profile
          </button>
        </div>
      </Box>
    </div>
  );
}

export default ProfileInfo;
