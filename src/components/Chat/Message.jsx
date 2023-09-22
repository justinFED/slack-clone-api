import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.isSelf ? 'self' : 'other'}`}>
      <p>{message.body}</p>
    </div>
  );
};

export default Message;
