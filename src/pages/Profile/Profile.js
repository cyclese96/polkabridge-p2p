import { Box, Container, Grid, Hidden, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import React, { useState } from "react";
import PopupLayout from "../../common/popups/PopupLayout";
import TxPopup from "../../common/popups/TxPopup";
import ProfileCurrency from "./ProfileComponents/ProfileCurrency";
import ProfileInfo from "./ProfileComponents/ProfileInfo";
import ProfileLogout from "./ProfileComponents/ProfileLogout";
import ProfilePayments from "./ProfileComponents/ProfilePayments";
import ProfileReferrals from "./ProfileComponents/ProfileReferrals";
import ProfileSettings from "./ProfileComponents/ProfileSettings";
import ProfileSidebar from "./ProfileComponents/ProfileSidebar";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  title: {
    color: "#212121",
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: "0.02em",
  },
  subtitle: {
    color: "#414141",
    fontWeight: 400,
    fontSize: 16,
  },
  sidebarCard: {
    marginTop: 20,
    marginBottom: 20,
    height: 200,
    width: "100%",
    border: "1px solid #eeeeee",
    padding: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
  },
}));

function Profile() {
  const classes = useStyles();

  const [tab, setTab] = useState(0);

  return (
    <Box className={classes.background}>
      <Container>
        <Box>
          <Typography
            variant="h3"
            color="textSecondary"
            className={classes.title}
          >
            My Profile
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.subtitle}
          >
            Update your proference for smooth trading experience.
          </Typography>
        </Box>
        <Grid container>
          <Hidden mdDown>
            <Grid item sm={3}>
              <ProfileSidebar setTab={setTab} tab={tab} />
            </Grid>
          </Hidden>
          <Grid item sm={9}>
            {tab === 0 && <ProfileInfo />}
            {tab === 1 && <ProfileCurrency />}
            {tab === 2 && <ProfilePayments />}
            {tab === 3 && <ProfileSettings />}
            {tab === 4 && <ProfileReferrals />}
            {tab === 5 && <ProfileLogout />}
          </Grid>
        </Grid>{" "}
        {/* <PopupLayout popupActive={true}>
          <TxPopup txCase={3} />
        </PopupLayout> */}
      </Container>
    </Box>
  );
}

export default Profile;
