import React from 'react';
import './Message.css';

const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(timestamp).toLocaleDateString(undefined, options);
};

const Message = ({ message }) => {
  return (
    <div className={`message ${message.isSelf ? 'self' : 'other'}`}>
      <p>{message.body}</p>
      <div className="message-time">{formatDate(message.timestamp)}</div>
    </div>
  );
};

export default Message;
