import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  sidebarCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
    width: "98%",
    border: "1px solid #EAECEE",
    padding: 10,
    backgroundColor: "#FFFFFF",

    borderRadius: 10,
  },
  singleTab: {
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
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
          color: tab === 0 ? theme.palette.primary.main : "#333333",
          fontWeight: tab === 0 ? 600 : 400,
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
          color: tab === 1 ? theme.palette.primary.main : "#333333",
          fontWeight: tab === 1 ? 600 : 400,
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
          color: tab === 2 ? theme.palette.primary.main : "#333333",
          fontWeight: tab === 2 ? 600 : 400,
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
          color: tab === 3 ? theme.palette.primary.main : "#333333",
          fontWeight: tab === 3 ? 600 : 400,
        }}
      >
        Settings
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(4)}
        style={{
          color: tab === 4 ? theme.palette.primary.main : "#333333",
          fontWeight: tab === 4 ? 600 : 400,
        }}
      >
        Referral
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.singleTab}
        onClick={() => setTab(5)}
        style={{
          color: tab === 5 ? theme.palette.primary.main : "#333333",
          fontWeight: tab === 5 ? 600 : 400,
          fontWeight: tab === 5 ? 600 : 400,
        }}
      >
        Logout
      </Typography>
    </div>
  );
}

export default ProfileSidebar;
