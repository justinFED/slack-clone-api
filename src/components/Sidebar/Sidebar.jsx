import React, { useState } from 'react';
import { FiberManualRecord } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import authService from '../../services/authService';
import './Sidebar.css'

const Sidebar = () => {
  const [channels, setChannels] = useState([]); // State to store channel names
  const [newChannelName, setNewChannelName] = useState(''); // State to store the new channel name

  const handleAddChannel = async () => {
    if (newChannelName.trim() === '') {
      return; // Don't add an empty channel name
    }

    try {
      // Create a new channel using the authService
      const response = await authService.createChannel(newChannelName.trim());
      if (response.status === 200) {
        // Channel creation successful, add it to the state
        setChannels([...channels, newChannelName.trim()]);
        // Clear the input field
        setNewChannelName('');
        console.log('Channel created successfully');
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
          {/* Input for entering a new channel name */}
          <input
            type="text"
            placeholder="Enter Channel Name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
          />
          <button onClick={handleAddChannel}>Create Channel</button>
        </div>
      </div>

      <div className="channels"> {/* Move the channels container here */}
        {channels.map((channel, index) => (
          <div key={index}>
            <h2># {channel}</h2> {/* Add a "#" prefix */}
          </div>
        ))}
      </div>

      <div className="sidebarOption">
        <div className="sidebar-text">
          <hr />
          {/* Add a search box here */}
          <input type="text" placeholder="Search Channels" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
