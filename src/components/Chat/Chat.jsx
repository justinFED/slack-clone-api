import React, { useState, useEffect } from 'react';
import './Chat.css';
import { InfoOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Message from './Message';
import authService from '../../services/authService';

const Chat = ({ sendMessageToUser }) => {
  const { channelName, selectedUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async (receiverId) => {
    try {
      const response = await authService.fetchMessages(receiverId);

      if (response.status === 200) {
        setMessages(response.data);
      } else {
        console.error('Failed to fetch messages:', response);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages(selectedUserId);
    }
  }, [selectedUserId]);


  const sendMessage = async () => {
    try {
      if (selectedUserId !== undefined) {
        const timestamp = Date.now();
  
        await authService.sendMessageToUser(selectedUserId, newMessage, timestamp);
  
        const newMessageObj = {
          body: newMessage,
          isSelf: true,
          timestamp: timestamp,
        };
        setMessages([...messages, newMessageObj]);
  
        setNewMessage('');
      } else {
        console.error('Invalid selected user ID:', selectedUserId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  if (!channelName) {
    return null;
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-headerLeft">
          <h4 className="chat-channelName">
            <strong># {channelName}</strong>
          </h4>
        </div>
        <div className="chat-headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>

      <div className="chat-messages">
  {messages.map((message, index) => (
    <Message key={index} message={message} timestamp={message.timestamp} />
  ))}
</div>

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
