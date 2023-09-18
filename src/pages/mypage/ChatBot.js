import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

import { Button, TextField, Paper, List, ListItem, Typography, Box } from "@mui/material";
import { Send, Close } from "@mui/icons-material";

// import styles from "../../styles/mypage/ChatBot.module.css";

const ChatBot = ({ closeModal }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatBotRef = useRef(null);
  const messageEndRef = useRef(null);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      width: "360px",
      height: '720px',
      backgroundColor: "white",
      border: "4px solid #1976d2",
      borderRadius: '25px',
      marginLeft: 'calc(98% - 380px)',
      marginTop: '480px',
    },
  };

  // ChatBot 닫기
  const closeChatBot = () => {
    closeModal();
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      // 사용자의 메시지를 화면에 추가
      setMessages([...messages, { isUser: true, text: inputMessage }]);

      // 서버로 요청을 보내고 응답을 받는다.
      const response = await axios.post("/rest/chatBot", {
        event: "send",
        inputText: inputMessage,
      });

      // 챗봇의 응답을 화면에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { isUser: false, text: response.data.bubbles[0].data.description },
      ]);
    } catch (error) {
      console.error("Error during API call", error);
    }

    setInputMessage("");
  };

  useEffect(() => {
    // 메세지 목록이 변경될 때, 스크롤을 가장 아래로 이동
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={{ zIndex: "9999" }}>
      <Modal
        ref={chatBotRef}
        isOpen={true}
        onRequestClose={closeChatBot}
        contentLabel="ChatBot Modal"
        ariaHideApp={false}
        style={modalStyles}
      >
        <div style={{display: 'flex', marginBottom: '15px'}}>
          <div style={{fontSize: '24px', fontWeight: 'bold', flex: '2', textAlign: 'center'}}>#FIT CHATBOT</div>
          <div style={{flex: '1', textAlign: "right"}}>
            <Button
                variant="outlined"
                color="error"
                onClick={closeChatBot}
              >닫기
            </Button>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: "column", height: '100%'}}>


          <List style={{overflowY:'auto', maxHeight: 'none', flexGrow: '1', height: '300px', borderTop: '1px lightgray solid', borderBottom: '1px lightgray solid'}}>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: message.isUser ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    backgroundColor: message.isUser ? "#E3F2FD" : "#81D594",
                    color: message.isUser ? "black" : "white",
                    borderRadius: message.isUser
                      ? "10px 0 10px 10px"
                      : "0 10px 10px 10px",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
              </ListItem>
            ))}
            <div ref={messageEndRef} />
          </List>
          <Box
            style={{alignSelf: 'center'}}
            sx={{
              display: "flex",
              alignItems: "stretch",
              gap: '10px',
              marginTop: '10px',
              width: '100%'
              
            }}
          >
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                  event.preventDefault();
                }
              }}
              sx={{ flex: 1, width: '100%' }} // 너비를 메시지 출력창과 동일하게 설정
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              endIcon={<Send />}
              sx={{ flex: 'none', height: '100%' }}
            >
              전송
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default ChatBot;
