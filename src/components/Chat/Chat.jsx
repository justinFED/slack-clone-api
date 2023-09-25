import React, { useState, useEffect } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import authServiceMethods from '../../services/authService';
import Message from './Message'

import './Chat.css'

const Chat = () => {
  const { channelName, selectedUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async (receiverId) => {
    try {
      const response = await authServiceMethods.fetchMessages(receiverId);

      if (response && response.data && Array.isArray(response.data)) {
        const filteredMessages = response.data.filter(
          (message) =>
            message.body !== 'Your message here' &&
            new Date(message.timestamp).toString() !== 'Invalid Date'
        );

        setMessages(filteredMessages);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (selectedUserId && channelName) {
      fetchMessages(selectedUserId);
    }
  }, [selectedUserId, channelName]);

  const sendMessage = async () => {
    try {
      if (selectedUserId !== undefined) {
        const timestamp = Date.now();

        const newMessageObj = {
          body: newMessage,
          timestamp: timestamp,
        };

        setMessages((prevMessages) => [...prevMessages, newMessageObj]);

        await authServiceMethods.sendMessageToUser(
          selectedUserId,
          newMessage,
          timestamp
        );

        setNewMessage('');
      } else {
        console.error('Invalid selected user ID:', selectedUserId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        ) : (
          <p></p>
        )}
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
