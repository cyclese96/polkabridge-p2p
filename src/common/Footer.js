import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Email,
  GitHub,
  Instagram,
  Reddit,
  Telegram,
  Twitter,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100%",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#6A55EA",
    borderRadius: 20,
  },
  heading: {
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  para: {
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: "-0.02em",
    color: "#414141",
    textAlign: "center",
    lineHeight: 1.5,
  },

  title: {
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: "0.02em",
    color: "#212121",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
  description: {
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: "#414141",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      color: "#212121",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box mb={3} mt={3}>
      <Box className={classes.background}>
        <Grid container>
          <Grid item md={4}>
            <h1
              variant="h1"
              className={classes.heading}
              style={{ color: "#f9f9f9", marginTop: 10 }}
            >
              Have questions?
              <br />
              How does it work!
            </h1>
          </Grid>
          <Grid item md={8}>
            <div className="d-flex justify-content-center">
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Twitter style={{ color: "#f9f9f9" }} />
              </IconButton>
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Telegram style={{ color: "#f9f9f9" }} />
              </IconButton>
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <GitHub style={{ color: "#f9f9f9" }} />
              </IconButton>
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Instagram style={{ color: "#f9f9f9" }} />
              </IconButton>

              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Reddit style={{ color: "#f9f9f9" }} />
              </IconButton>
              <IconButton
                style={{ backgroundColor: "#212121", marginRight: 10 }}
              >
                <Email style={{ color: "#f9f9f9" }} />
              </IconButton>
            </div>
            <p
              className={classes.para}
              style={{ color: "#f9f9f9", marginTop: 10 }}
            >
              Join 10K+ people working together to make the world a better
              place.
            </p>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems={"center"}
        mt={5}
      >
        <img src="polkabridge.png" height="80px" />

        <p className={classes.para} style={{ color: "#212121", marginTop: 10 }}>
          Copyright 2022 <span style={{ color: "#6A55EA" }}>PolkaBridge</span>.
          All Rights Reserved.
        </p>
      </Box>
    </Box>
  );
}
