import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
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
    color: "#919191",
    fontWeight: 500,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    padding: "8px 30px 8px 30px",
    color: "white",
    border: "none",
  },
}));

function ProfileInfo() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormField] = useState({});

  const profile = useSelector((state) => state?.profile?.profile);

  const submitProfile = useCallback(() => {
    setEditMode(false);

    dispatch(updateUserProfile(formFields));
  }, [formFields, editMode, setEditMode]);

  const onEdit = useCallback(() => {
    setFormField({
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
    });
    setEditMode(true);
  }, [profile, editMode, setEditMode]);

  return (
    <>
      {!editMode && (
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
                {profile && profile.name ? profile.name : "PolkaBridge User"}
              </Typography>
              <Typography
                variant="body2"
                color="#0C7ED0"
                className={classes.address}
                fontWeight={400}
                fontSize={14}
              >
                {profile && profile.wallet_address
                  ? profile.wallet_address
                  : "wallet unavailable"}
              </Typography>
            </Box>
          </Box>
          <Box pt={3}>
            <div class="row mt-3">
              <div class="col-md-2">
                <label for="inputEmail4" className={classes.label}>
                  Full Name:
                </label>
              </div>
              <div class="col-md-10">
                <Typography align="start" fontWeight={400}>
                  {profile?.name}
                </Typography>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <div class="row mt-3">
                  <div class="col-md-4">
                    <label for="inputEmail4" className={classes.label}>
                      Email:
                    </label>
                  </div>
                  <div class="col-md-7">
                    <Typography align="start" fontWeight={400}>
                      {profile?.email}
                    </Typography>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div className="row mt-3">
                  <div class="col-md-4">
                    <label for="inputPassword4" className={classes.label}>
                      Mobile:
                    </label>
                  </div>
                  <div class="col-md-7">
                    <Typography align="start" fontWeight={400}>
                      {profile?.phone}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <button className={classes.submitButton} onClick={onEdit}>
                Edit profile
              </button>
            </div>
          </Box>
        </div>
      )}
      {editMode && (
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
                {profile && profile.name ? profile.name : "PolkaBridge User"}
              </Typography>
              <Typography
                variant="body2"
                color="#0C7ED0"
                className={classes.address}
                fontWeight={400}
                fontSize={14}
              >
                {profile && profile.wallet_address
                  ? profile.wallet_address
                  : "wallet unavailable"}
              </Typography>
            </Box>
          </Box>
          <Box pt={3}>
            <div class="row mt-3">
              <div class="col-md-2">
                <label for="inputEmail4" className={classes.label}>
                  Full Name:
                </label>
              </div>
              <div class="col-md-10">
                <input
                  onChange={(e) => {
                    setFormField({ ...formFields, name: e.target.value });
                  }}
                  type="text"
                  value={formFields?.name}
                  class="input-p2p"
                  id="inputEmail4"
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6">
                <div class="row mt-3">
                  <div class="col-md-4">
                    <label for="inputEmail4" className={classes.label}>
                      Email:
                    </label>
                  </div>
                  <div class="col-md-7">
                    <input
                      onChange={(e) => {
                        setFormField({ ...formFields, email: e.target.value });
                      }}
                      value={formFields?.email}
                      type="email"
                      class="input-p2p"
                      id="inputEmail4"
                      placeholder="Email"
                      disabled={profile?.email_verified}
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div className="row mt-3">
                  <div class="col-md-4">
                    <label for="inputPassword4" className={classes.label}>
                      Mobile:
                    </label>
                  </div>
                  <div class="col-md-7">
                    <input
                      onChange={(e) => {
                        setFormField({ ...formFields, phone: e.target.value });
                      }}
                      value={formFields?.phone}
                      type="text"
                      class="input-p2p"
                      placeholder="Mobile"
                      disabled={profile?.phone_verified}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <button className={classes.submitButton} onClick={submitProfile}>
                Update profile
              </button>
            </div>
          </Box>
        </div>
      )}
    </>
  );
}

export default ProfileInfo;
