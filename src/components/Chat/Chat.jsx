import React, { useState, useEffect } from 'react';
import './Chat.css';
import { InfoOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Message from './Message';
import authService from '../../services/authService';

const Chat = () => {
  const { channelName, selectedUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  

  // Function to fetch existing messages
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

  // Call fetchMessages when the component mounts and when selectedUserId changes
  useEffect(() => {
    if (selectedUserId) {
      fetchMessages(selectedUserId);
    }
  }, [selectedUserId]);

  // Function to send a new message
  const sendMessage = async () => {
    try {
      if (selectedUserId !== undefined) {
        // Send the new message
        await authService.sendMessageToUser(selectedUserId, newMessage);
        
        // Update the messages state with the new message
        const newMessageObj = {
          body: newMessage,
          isSelf: true, // Assuming the message is from the user
        };
        setMessages([...messages, newMessageObj]);

        // Clear the input field
        setNewMessage('');
      } else {
        console.error('Invalid selected user ID:', selectedUserId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Conditionally render the chat only if a channelName is defined
  if (!channelName) {
    return null; // Return null if there's no channelName
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-headerLeft">
          <h4 className="chat-channelName">
            {/* Display the channel name */}
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
          <Message key={index} message={message} />
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
