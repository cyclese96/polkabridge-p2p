import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  chatCard: {
    marginTop: 20,
    marginBottom: 20,
    height: 500,
    width: "100%",
    maxWidth: 700,
    border: "1px solid #EAECEE",

    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  senderWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right",
    marginTop: 10,
  },
  receiverWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 10,
  },
}));

export default function ChatBox() {
  const classes = useStyles();

  return (
    <Box>
      <Box mt={2} style={{ width: "100%" }} className={classes.chatCard}>
        <Box
          py={3}
          style={{
            backgroundColor: "#6A55EA",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Typography
            display="flex"
            textAlign="left"
            variant="body1"
            color={"white"}
            p={2}
            style={{ fontWeight: 600 }}
          >
            Chat with seller:
          </Typography>
        </Box>
        <Box p={2} style={{ width: "100%" }}>
          <Box className={classes.senderWrapper}>
            <Typography
              textAlign="right"
              variant="body1"
              color={"black"}
              style={{
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 20,
                backgroundColor: "#e5e5e5",
                padding: "7px 18px 7px 18px",
              }}
            >
              Did receive?
            </Typography>
          </Box>
          <Box className={classes.receiverWrapper}>
            <Typography
              textAlign="left"
              variant="body1"
              color={"black"}
              style={{
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 20,
                backgroundColor: "#f3e5f5",
                padding: "7px 18px 7px 18px",
              }}
            >
              Let me check
            </Typography>
          </Box>
          <Box className={classes.senderWrapper}>
            <Typography
              textAlign="right"
              variant="body1"
              color={"black"}
              style={{
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 20,
                backgroundColor: "#e5e5e5",
                padding: "7px 18px 7px 18px",
              }}
            >
              Sure
            </Typography>
          </Box>
          <Box className={classes.receiverWrapper}>
            <Typography
              textAlign="left"
              variant="body1"
              color={"black"}
              style={{
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 20,
                backgroundColor: "#f3e5f5",
                padding: "7px 18px 7px 18px",
              }}
            >
              Yes received, Thanks!
            </Typography>
          </Box>
          <Box className={classes.senderWrapper}>
            <Typography
              textAlign="right"
              variant="body1"
              color={"black"}
              style={{
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 20,
                backgroundColor: "#e5e5e5",
                padding: "7px 18px 7px 18px",
              }}
            >
              Cool!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
