import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  sidebarCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "98%",
    border: "1px solid #eeeeee",
    padding: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
  singleTab: {
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
}));

function ProfileSidebar({ tab, setTab }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.sidebarCard}>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        style={{
          color: tab === 0 ? "#E0077D" : "#333333",
        }}
        onClick={() => setTab(0)}
      >
        Profile
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(1)}
        style={{
          color: tab === 1 ? "#E0077D" : "#333333",
        }}
      >
        Currency Preferences
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(2)}
        style={{
          color: tab === 2 ? "#E0077D" : "#333333",
        }}
      >
        Payment Options
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(3)}
        style={{
          color: tab === 3 ? "#E0077D" : "#333333",
        }}
      >
        Security
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(4)}
        style={{
          color: tab === 4 ? "#E0077D" : "#333333",
        }}
      >
        Settings
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(5)}
        style={{
          color: tab === 5 ? "#E0077D" : "#333333",
        }}
      >
        Referral
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(6)}
        style={{
          color: tab === 6 ? "#E0077D" : "#333333",
        }}
      >
        Logout
      </Typography>
    </div>
  );
}

export default ProfileSidebar;
