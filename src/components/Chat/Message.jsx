import React from 'react';
import './Message.css'; // Import your CSS file

const Message = ({ message }) => {
  // 'message' should be an object containing message data, e.g., message.sender, message.body, etc.

  return (
    <div className="message">
      <div className="message-sender">{message.sender}</div>
      <div className="message-body">{message.body}</div>
    </div>
  );
};

export default Message;
