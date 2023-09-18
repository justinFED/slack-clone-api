import React, { useState } from 'react';
import { FiberManualRecord } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import authService from '../../services/authService';
import './Sidebar.css';

const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [userId, setUserId] = useState('');

  const handleAddChannelClick = () => {
    setIsModalOpen(true);
  };

  const handleAddChannel = async (channelName, userId) => {
    try {
      // Create a new channel using the authService
      const response = await authService.createChannel(channelName, userId);
      if (response.status === 200) {
        // Channel creation successful, perform any additional actions if needed
        console.log('Channel created successfully');
        setIsModalOpen(false); // Close the modal after channel creation
      }
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error creating channel:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-info">
          <h2>Slack App</h2>
          <h3>
            <FiberManualRecord />
            Justin Cantillo
          </h3>
        </div>

        <CreateIcon />
      </div>

      <div className="sidebarOption">
        <div className="sidebar-text">
          <h2>New Message</h2>
          <hr />
          <h2 onClick={handleAddChannelClick}>Add Channel</h2>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <label>
           <h4>Enter channel name:</h4>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </label>
          <label>
          <h4>Enter user ID:</h4>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
          <div className="button-container">
      <button onClick={() => handleAddChannel(channelName, userId)}>Create Channel</button>
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
    </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
