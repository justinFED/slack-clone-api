import React, { useState, useEffect } from 'react';
import { FiberManualRecord } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import authService from '../../services/authService';

import './Sidebar.css';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleUserSearch = async () => {
    try {
      const response = await authService.searchUsers();

      // Assuming the response contains the list of users
      const userList = response.data;

      // Map the user data to options for the dropdown
      const options = userList.map((user) => ({
        value: user.id,
        label: user.name,
      }));

      setUserOptions(options);
      setSearchResults(options);
    } catch (error) {
      console.error('Error fetching list of users:', error);
    }
  };

  const handleAddChannelClick = () => {
    setIsModalOpen(true);
  };

  const handleAddChannel = async () => {
    // Implement the channel creation logic here
  };

  const handleSearchUserClick = () => {
    // Fetch and display all users when the "Search User" button is clicked
    handleUserSearch();
  };

  useEffect(() => {
    // Fetch the list of users when the component mounts
    handleUserSearch();
  }, []); // The empty array [] ensures that this effect runs only once

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
            <h4>Search user:</h4>
            <input
              type="text"
              placeholder="Search user..."
            />
            <button onClick={handleSearchUserClick}>Search User</button>
          </label>
          <div className="user-search-results">
            {searchResults.map((userOption) => (
              <div
                key={userOption.value}
                onClick={() => setSelectedUser(userOption)}
              >
                {userOption.label}
              </div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={handleAddChannel}>Create Channel</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
