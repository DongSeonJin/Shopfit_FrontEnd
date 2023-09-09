import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

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
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div>
      <HeaderSubMyPage />
      <div>
        <h2>1 : 1 문의</h2>
        <ul id="chat-container" style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {messages.map((message, index) => (
            <li key={index} style={{ textAlign: message.isUser ? "right" : "left" }}>
              {message.text}
            </li>
          ))}
        </ul>

        <div>
          <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
