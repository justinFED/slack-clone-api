import React, { useState } from 'react';
import './Chat.css';
import { InfoOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Message from './Message';
import sendMessageToUser from './sendMessageToUser';

const Chat = ({ selectedUser }) => { // Receive the selectedUser as a prop
  const { channelName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    try {
      // Use the selectedUser's ID to send a message
      await sendMessageToUser(selectedUser, newMessage);

      const message = {
        sender: 'User1',
        body: newMessage,
      };

      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-headerLeft">
          <h4 className="chat-channelName">
            <strong># {channelName}</strong> {/* Display the channelName from the route */}
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
