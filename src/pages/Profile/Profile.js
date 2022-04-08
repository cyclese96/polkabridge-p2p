import { Box, Grid, Hidden } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import React, { useState } from "react";
import ProfileCurrency from "./ProfileComponents/ProfileCurrency";
import ProfileInfo from "./ProfileComponents/ProfileInfo";
import ProfileSidebar from "./ProfileComponents/ProfileSidebar";

const useStyles = makeStyles((theme) => ({
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
    <Box>
      <Grid container>
        <Hidden mdDown>
          <Grid item sm={3}>
            <ProfileSidebar setTab={setTab} tab={tab} />
          </Grid>
        </Hidden>
        <Grid item sm={9}>
          {tab === 0 && <ProfileInfo />}
          {tab === 1 && <ProfileCurrency />}
        </Grid>
      </Grid>{" "}
    </Box>
  );
}

export default Profile;
