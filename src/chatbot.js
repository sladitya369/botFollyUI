import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaUserAstronaut } from 'react-icons/fa';


function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    axios.get('http://172.178.35.193:8080/chatBot/response', {
      params: {
          message: message
      }, mode: 'no-cors'
  }).then(response=>{
setChat([...chat, { message, role: "user" }]);
setChat([...chat, { content: response.data, role: "BotManager" }]);

  })


  let msgs = chat;
  msgs.push({ role: "User", content: message });
  setChat([...msgs, { message }]);
  
    // clear the message input field
    setMessage('');

   
  }
  return (


    <main>
    <h1>The BOTFolly</h1>

    <section>
      {chat && chat.length
        ? chat.map((chatMessage, index) => (
            <p key={index} className={chatMessage.role === "User" ? "user_msg" : ""}>
             
              {chatMessage.role === "User" ?  <><span>
              <span>{chatMessage.content}</span> <span>:</span><b>{chatMessage.role}</b> </span><FaUser /></> :
              <><span> 
              <FaUserAstronaut /> <b>{chatMessage.role}</b> </span><span>:</span>
              <span>
              {chatMessage.content}
              </span></> }
              
            </p>
          ))
        : ""}
    </section>
    
    <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
      <input
        type="text"
        name="message"
        value={message}
        placeholder="Type a message here and hit Enter..."
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  </main>
);
}

export default Chatbot;
