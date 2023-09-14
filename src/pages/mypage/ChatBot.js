import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button, TextField, Typography, Paper, List, ListItem, ListItemText, Box } from "@mui/material";
import styles from "../../styles/mypage/ChatBot.module.css"

const ChatBot = ({ closeModal }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatBotRef = useRef(null);

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
      const response = await axios.post("/rest/chatBot", { event: "send", inputText: inputMessage });

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
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

   return (
     <div>
       {/* 모달 창 */}
       <Modal
         ref={chatBotRef} 
         isOpen={true}
         onRequestClose={closeChatBot}
         contentLabel="ChatBot Modal"
         ariaHideApp={false}
         style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 챗봇 실행했을 때 뒷 배경 색상
          },
          content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "500px", // 원하는 가로 크기로 조절
            maxHeight: "80%", // 원하는 세로 크기로 조절
            margin: "auto", // 가운데 정렬
          },
         }}
       >

        <div className={styles["modal-content"]}>
        <button className={styles["close-button"]} onClick={closeChatBot}> X </button> <br />
          <h2>#FIT CHATBOT</h2>
          <ul id={styles["chat-container"]}>
            {messages.map((message, index) => (
              <li key={index} style={{ textAlign: message.isUser ? "right" : "left" }}>
                {message.text}
              </li>
            ))}
          </ul>
          <div className={styles["input-container"]}>
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <button onClick={sendMessage}>전송</button>
          </div>
          {/* 챗봇 닫기 버튼 */}
        {/* <button onClick={closeChatBot}>챗봇 닫기</button> <br /> */}

            

          </div>
        </Modal>  
     </div> 
   );
};

export default ChatBot;
