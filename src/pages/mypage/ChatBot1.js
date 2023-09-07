// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import '../../styles/mypage/ChatBot.module.css';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
// import EmailIcon from '@mui/icons-material/Email';
// import { Backdrop, Fade } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import useSWR from 'swr';
// import fetcher from '../../utils/fetcher';
// // import HelpModal from './HelpModal';

// function ChatBot() {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isGptMode, setIsGptMode] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const navigate = useNavigate();
//   const [helpModalOpen, setHelpModalOpen] = React.useState(false);

//   const chatMessagesRef = useRef(null);
//   const messageEndRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   function toggleChatBot() {
//     if (isVisible) {
//       setIsVisible(false);

//     } else {
//       setIsVisible(true);
//       if (messages.length === 0) {
//         handleOpenEvent().catch((error) => {
//           console.error('handleOpenEvent 오류:', error);

//         });
//       }
//     }
//   }

//   const { data: myData, mutate: mutateMe } = useSWR(
//     // `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
//     fetcher
//   );
       
//   useEffect(() => {
//     if (myData) {
//       const { userId, role } = myData;  
//     }
//   }, [myData]);

//   const handleOpenEvent = async () => {
//     console.log("메시지 출발합니다");
// 	const apiUrl = `${import.meta.env.VITE_SPRING_HOST}/rest/chatbot`;
// 	const requestBodyWelcome = {
//         version: "v2",
//         userId: myData ? myData.userName : "사용자",
//         timestamp: new Date().getTime(),
//         bubbles: [],
//         event: "open",
//     };
    
//     const requestBodyStringWelcome = JSON.stringify(requestBodyWelcome);
    
//     try {        
//         const response = await axios.post(apiUrl, requestBodyWelcome, {
//             headers: {
//               'Content-Type': 'application/json;UTF-8',
//             },
//           });
          
//           const jsonData = JSON.stringify(response);
      
//           const jsonObject = JSON.parse(jsonData);

//           if (jsonData.error) {
//             console.error('네이버 챗봇 서버 에러:', jsonData.error);
//             throw new Error(jsonData.error);
//           }
      
//           jsonObject.data.bubbles.forEach((bubble, index) => {
//             if (index === 0) {
//               // 첫 번째 버블: 웰컴 메시지
//               const message = {
//                 type: 'bot',
//                 text: bubble.data.description,
//               };
//               setMessages(prevMessages => [...prevMessages, message]);
//             } else if (bubble.type === 'template') {
//               // 두 번째 버블: 링크 목록
//               const buttons = [];
//               bubble.data.contentTable.forEach((row) => {
//                 row.forEach((item) => {
//                     const title = item.data.title; // 링크의 설명
//                     let url = (item.data.data.action.data.url); // 링크의 URL
                  
//                     buttons.push({ title, url });
//         });
//       });
//       const message = {
//         type: 'bot',
//         text: bubble.data.cover.data.description, //  멀티버튼 상단 텍스트
//         buttons, // 버튼들
//       };
//       setMessages(prevMessages => [...prevMessages, message]);
//     }
//   });
      
//           return null;
//         } catch (error) {
//           console.error('handleOpenEvent 오류:', error);
//           throw error;
//         }
//       };

  
// // //HELP버튼 >> 추후 모달창으로 수정? 
// //   const handleHelpClick = () => {
// //     setHelpModalOpen(true);
// // };

// const handleClose = (event) => {
//     event.stopPropagation();
//     setHelpModalOpen(false);
//   };

//   useEffect(() => {
// 	messageEndRef.current.scrollIntoView({ behavior: 'auto'});
//   }, [messages]);

//   //입력용
//   const handleInput = (event) => {
//     setInputText(event.target.value);
//     if (event.key === 'Enter') {
//       setInputText('');
//     }
//   };
  
//   function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
  
//   //메시지전송
//   const sendMessage = async (event) => {
// 	event.preventDefault();
// 	const userMessage = { type: 'user', text: inputText };
// 	setMessages([...messages, userMessage]);

//     if (isGptMode) {
//         setIsTyping(true); // GPT 응답을 표시하는 동안 "입력 중" 상태로 설정
  
//         const botMessage = await handleSendMessage(inputText);
//         const botMessageArray = botMessage.split(''); // 응답 메시지를 한 글자씩 배열로 분리
  
//         // 한 글자씩 지연시간을 두면서 메시지 추가
//         for (let i = 0; i < botMessageArray.length; i++) {
//           await delay(25); // 0.1초 대기 (원하는 지연시간 설정)
//           const currentBotMessage = botMessageArray.slice(0, i + 1).join('');
//           const currentBotMessageObject = { type: 'bot', text: currentBotMessage };
//           setMessages([...messages, userMessage, currentBotMessageObject]);
//         }        
//         setIsTyping(false); // GPT 응답 표시 종료 후 "입력 중" 상태 해제
//       } else {
// 	const response = await handleSendMessage(inputText);
// 	const botMessage = { type: 'bot', text: response };
// 	setMessages([...messages, userMessage, botMessage]);
//       }
// 	setInputText('');
//   };
//   const chatContainerRef = useRef(null);

//   const modalStyle = {
//    /*  width: '50%',
//     height: '50%',
//     기타 원하는 스타일 속성들 */
//   }; 

// // const handleSendMessage = async (text) => {
// //   document.querySelector('.toggleChatBot').addEventListener('click', async function () {
// //     this.classList.toggle('active');    
// //   });
  
// //   if (isGptMode) {
// //     // const apiUrl =`${import.meta.env.VITE_SPRING_HOST}/rest/gpt`;
// //     const response = await axios.post(apiUrl, {
// //         prompt: inputText
// //       }, {
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //       });
// //       // 서버로부터의 응답을 받아 JSON으로 변환

// //       // 변환된 JSON의 'text' 필드가 응답 메시지가 될 것이다.
// //       const botMessage = response.data;
// //       return botMessage;
// //     } else {
// //     //const apiUrl = 'http://192.168.0.37:8080/rest/chatbot';
// //     // const apiUrl = `${import.meta.env.VITE_SPRING_HOST}/rest/chatbot`;
// //     const apiUrl = 'http://localhost:8080/rest/chatbot';
// //     const requestBody = {
// //         version: 'v2',
// //         userId: myData ? myData.userName : "사용자",
// //         timestamp: new Date().getTime(),
// //         inputText: text,
// //         bubbles: [
// //           {
// //             type: 'text',
// //             data: {
// //               description: text,
// //             },
// //           },
// //         ],
// //         event: 'send',
// //         isGptMode: isGptMode,
// //       };    

// //     const requestBodyString = JSON.stringify(requestBody);
    
// //     return axios
// //       .post(apiUrl, requestBodyString, {
// //         headers: {
// //           'Content-Type': 'application/json;UTF-8',
// //         },
// //       })
// //       .then((response) => {
// //         let jsonData = response.data;
// //         let bubbleArray = jsonData.bubbles;
// //         let botMessage = bubbleArray[0].data.description;
// //         if (bubbleArray[0].data.url && bubbleArray[0].data.urlAlias) {
// //           botMessage = `${botMessage}\n\n[URL](${bubbleArray[0].data.urlAlias})`;
// //         }
// //         return botMessage;
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   }
// // };


// const handleSendMessage = async (text) => {
//   document.querySelector('.toggleChatBot').addEventListener('click', async function () {
//     this.classList.toggle('active');    
//   });
  
//   // const apiUrl = `${import.meta.env.VITE_SPRING_HOST}/rest/chatbot`;
//   const apiUrl = 'http://localhost:8080/rest/chatbot';
  
//   const requestBody = {
//     version: 'v2',
//     userId: myData ? myData.userName : "사용자",
//     timestamp: new Date().getTime(),
//     inputText: text,
//     bubbles: [
//       {
//         type: 'text',
//         data: {
//           description: text,
//         },
//       },
//     ],
//     event: 'send'
//   };    

//   const requestBodyString = JSON.stringify(requestBody);

//   return axios
//     .post(apiUrl, requestBodyString, {
//       headers: {
//         'Content-Type': 'application/json;UTF-8',
//       },
//     })
//     .then((response) => {
//       let jsonData = response.data;
//       let bubbleArray = jsonData.bubbles;
//       let botMessage = bubbleArray[0].data.description;
      
//       if (bubbleArray[0].data.url && bubbleArray[0].data.urlAlias) {
//         botMessage = `${botMessage}

//         [URL](${bubbleArray[0].data.urlAlias})`;
//       }
      
//       return botMessage;
      
//      })
//      .catch((error) => { 
//        console.error(error); 
//      });
// };




//   return (
//       <div>
//           <button
//               className="toggleChatBot"
//               onClick={toggleChatBot}
//               style={{ backgroundColor: '#036635'  }}
//           >
//               {!isVisible ? (
//                   <SmartToyRoundedIcon style={{ fontSize: '33px' }} />
//               ) : isGptMode ? (
//                   <PsychologyRoundedIcon style={{ fontSize: '36px' }}/>
//               ) : (
//                   <CloseRoundedIcon style={{ fontSize: '36px' }}/>
//               )}
//           </button>

//           <div
//               className={`chat-container ${isVisible ? "" : "hidden"}`}
//               style={{ textAlign: "right" }}
//           >
//               <div className="chat-header">
//                   {/* 챗봇 창 상단에 HELP 버튼 추가 */}
//                   {/* <IconButton className="help-button" onClick={handleHelpClick} sx={{color : 'white'}}>
//   <HelpOutlineIcon />
//   <HelpModal open={helpModalOpen} handleClose={handleClose} />
// </IconButton> */}
//                   <div style={{ textAlign: "left", color: "white", marginRight: "119px" }} >
//                   <h3>GAGABOT</h3>
//                   </div>
//               </div>
//               <div className="chat-messages" id="chatMessages" >
//               {messages.map((message, index) => (
//   <div key={index} className={`chat-message ${message.type}`} style={{ marginBottom: "12px" }}>
//     <h5 style={{ margin: "5px" }}>
//       {message.type === "user" ? myData ? myData.userName : "사용자" : "GAGABOT"}
//     </h5>
//     <p>
//       {message.type === 'bot' && message.buttons ? (
//         <div>
//           <p>{message.text}</p>
//           {message.buttons.map((button, buttonIndex) => (
//             <Button 
//               key={buttonIndex} 
//               variant="contained" 
//               color="primary" 
//               onClick={() => {
//                 const url = new URL(button.url);
//                 navigate(url.pathname);
//               }}
//             >
//               {button.title}
//             </Button>
//           ))}
//         </div>
//       ) : (
//         isGptMode ? 
//         message.text.replace(/\./g, '.\n').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)
//         : message.text
//       )}
// {message.text.includes("죄송"||"문의") && (
//   <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
//     <Button 
//       variant="contained" 
//       onClick={() => window.location.href = 'mailto:thega4004@naver.com'} 
//       style={{fontSize: '11px', width: '25%'}}
//     >
//       <EmailIcon style={{fontSize: '11px'}}/> 문의
//     </Button>
//     <Button 
//       variant="contained" 
//       onClick={() => navigate('/notice/ListQnaPost')}
//       style={{fontSize: '11px', width: '25%'}}
//     >
//      FAQ
//     </Button>
//   </div>
// )}
//     </p>
//     {message.type === "bot" && message.bubbles && (
//       <div>
//       {message.bubbles.map(
//           (bubble, bubbleIndex) => {
//               if (bubbleIndex === 0) {
//                   // 첫 번째 버블: 웰컴 메시지
//                   return (
//                       <p key={bubbleIndex}>
//                           {bubble.data.description}
//                       </p>
//                   );
//               } else if (bubble.type === 'template') {
//                   // 두 번째 버블: 링크 목록
//                   return (
//                       <div key={bubbleIndex}>
//                           <p>{bubble.data.cover.data.description}</p>
  
//                           <Stack spacing={1} direction="column">
//                               {bubble.data.contentTable.flat().map((cell, cellIndex) => {
//                                   const url = new URL(cell.data.data.action.data.url).pathname; // 셀의 URL
//                                   return (
//                                       <Button 
//                                           key={cellIndex} 
//                                           variant="contained" 
//                                           sx={{ justifyContent: 'center', bgcolor: '#3eb394', padding: '0px', maxWidth: '30px' }} 
//                                           onClick={() => navigate(url)} // 이동하려는 URL을 경로로 사용
//                                       >
//                                           {cell.data.title}
//                                       </Button>
//                                   );
//                               })}
//                           </Stack>
//                       </div>
//                   )
//               }
//           }
//       )}
//   </div>
//     )}
//   </div>
// ))}
//                   {isTyping && <p className="typing-indicator">챗봇 응답 중...</p>}
//                   <div ref={messageEndRef} />
//               </div>
//               <div className="chat-input">
//                   {/* <Button className="toggle-gpt" onClick={handleToggleGpt}>
//                       GPT
//                   </Button> */}
//                   <form onSubmit={sendMessage}>
//                       <TextField
//                           type="text"
//                           id="messageInput"
//                           value={inputText}
//                           onChange={handleInput}
//                           placeholder="채팅을 입력해주세요~"
//                           fullWidth
//                       />
//                       <Button
//                           type="submit"
//                           id="sendButton"
//                           variant="contained"
//                           color="primary"
//                       >
//                           <IconButton
//                               className="submit"
//                               type="submit"
//                               onClick={handleSendMessage}
//                           >
//                               <SendRoundedIcon onClick={handleSendMessage} />
//                           </IconButton>
//                       </Button>
//                   </form>
//               </div>
//           </div>
//       </div>
//   ); 
// }
// export default ChatBot; 