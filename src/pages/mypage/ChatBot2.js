// // src/Chatbot.js
// import React, { Component } from 'react';
// import WebSocketClient from 'websocket';

// class Chatbot extends Component {
//   constructor() {
//     super();
//     this.state = {
//       message: '',
//       chatLog: [],
//     };

//     this.socket = new WebSocketClient('ws://localhost:8080/ws'); // 백엔드 WebSocket 주소로 변경
//     this.socket.onmessage = this.handleMessage;
//   }

//   handleMessage = (event) => {
//     const message = JSON.parse(event.data);
//     this.setState((prevState) => ({
//       chatLog: [...prevState.chatLog, message],
//     }));
//   };

//   sendMessage = () => {
//     const { message } = this.state;
//     this.socket.send(JSON.stringify({ message }));
//     this.setState({
//       message: '',
//     });
//   };

//   render() {
//     const { message, chatLog } = this.state;
//     return (
//       <div>
//         <div>
//           <ul>
//             {chatLog.map((chat, index) => (
//               <li key={index}>{chat}</li>
//             ))}
//           </ul>
//         </div>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => this.setState({ message: e.target.value })}
//         />
//         <button onClick={this.sendMessage}>Send</button>
//       </div>
//     );
//   }
// }

// export default Chatbot;
