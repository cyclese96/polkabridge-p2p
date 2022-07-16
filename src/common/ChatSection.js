import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Input,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  chatCard: {
    marginTop: 20,
    marginBottom: 20,
    height: "100%",
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

export default function ChatSection() {
  const classes = useStyles();
  const [chats, setChats] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const currentUser = "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448";

  let chatDummy = [
    {
      name: "Tahir",
      address: "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448",
      message: "Hello, tokens sent?",
      timestamp: 1657955474,
    },
    {
      name: "Aamir",
      address: "0xeBB825f034519927D2c54171d36B4801DEf2A6B1",
      message: "Yes sent",
      timestamp: 1657965474,
    },
    {
      name: "Tahir",
      address: "0x9D7117a07fca9F22911d379A9fd5118A5FA4F448",
      message: "Thanks",
      timestamp: 1657975474,
    },
  ];
  useEffect(() => {
    let allChats = chatDummy.sort((a, b) => a.timestamp - b.timestamp);
    setChats(allChats);
  }, [chatDummy]);

  const sendNewMessage = async () => {
    console.log("Sent!");
  };
  return (
    <Box>
      <Box mt={2} style={{ width: "100%" }} className={classes.chatCard}>
        <Box
          display={"flex"}
          justifyContent="space-between"
          py={3}
          style={{
            backgroundColor: "#6A55EA",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Box>
            <Box
              ml={2}
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "50%",
                padding: 5,
                height: 50,
                width: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://polkabridge.org/images/symbol.png"
                height={35}
                width={35}
              />
            </Box>
            <Typography
              display="flex"
              textAlign="left"
              variant="body1"
              color={"white"}
              pl={2}
              pt={2}
              style={{ fontWeight: 600 }}
            >
              Hi, there!
            </Typography>
            <Typography
              display="flex"
              textAlign="left"
              variant="body1"
              color={"white"}
              fontWeight={400}
              fontSize={11}
              pl={2}
            >
              Connect with your peer & resolve the matter quickly
            </Typography>
          </Box>
          <Box>
            <Close
              style={{ color: "white", cursor: "pointer", marginRight: 10 }}
            />
          </Box>
        </Box>
        <Box p={2} style={{ width: "100%", height: 330, overflowY: "auto" }}>
          {chats.map((item) => {
            return item.address === currentUser ? (
              <Box className={classes.receiverWrapper}>
                <Typography
                  textAlign="left"
                  variant="body1"
                  color={"black"}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    borderRadius: 20,
                    backgroundColor: "#6A55EA",
                    color: "white",
                    padding: "7px 18px 7px 18px",
                  }}
                >
                  {item.message}
                </Typography>
              </Box>
            ) : (
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
                  {item.message}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box
          my={1}
          p={1}
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Input
            type="text"
            value={messageInput}
            placeholder="Type here..."
            onChange={(e) => setMessageInput(e.target.value)}
            disableUnderline={true}
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #EAECEE",
              borderRadius: 14,
              boxSizing: "border-box",
              outline: "none",
              padding: 10,
              fontSize: 12,
              marginRight: 7,
            }}
          />
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#6A55EA",
              padding: "5px 20px 5px 20px",
              color: "white",
              fontSize: 13,
            }}
            disabled={messageInput === ""}
            onClick={sendNewMessage}
          >
            Send <Send style={{ fontSize: 14, marginLeft: 5 }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
