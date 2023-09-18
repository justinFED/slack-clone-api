import React, { useState } from 'react';
import './Chat.css';
import { InfoOutlined } from '@mui/icons-material';
import Message from './Message'; // Import the Message component

const Chat = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [newMessage, setNewMessage] = useState(''); // State to store the new message input

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() === '') {
      return; // Prevent sending empty messages
    }

    // Create a new message object and add it to the messages state
    const message = {
      sender: 'User1', // Replace with the actual sender's name or ID
      body: newMessage, // Use the content from the input
    };

    setMessages([...messages, message]);
    setNewMessage(''); // Clear the input field after sending
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-headerLeft">
          <h4 className="chat-channelName">
            <strong># general</strong>
          </h4>
        </div>

        <div className="chat-headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>

      {/* Render messages using the Message component */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      {/* Add a message input and button to send messages */}
      <div className="chat-input">
        <form>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="button" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
