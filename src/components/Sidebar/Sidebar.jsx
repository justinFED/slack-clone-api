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
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(true); // Initially show search results

  const handleUserSearch = async () => {
    try {
      const authHeaders = {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'uid': localStorage.getItem('uid'),
      };

      const response = await authService.searchUsers(authHeaders);

      // Assuming the response contains the list of users
      const userList = response.data;

      // Filter the user list based on the search term
      const filteredUsers = userList.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Map the filtered user data to options for the dropdown
      const options = filteredUsers.map((user) => ({
        value: user.id,
        label: user.email,
      }));

      setUserOptions(options);
      setSearchResults(options);
      setShowSearchResults(true); // Show search results when there are results
    } catch (error) {
      console.error('Error fetching list of users:', error);
    }
  };

  const handleSearchInputChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === '') {
      // Clear search results and hide them when the search input is empty
      setSearchResults([]);
      setShowSearchResults(false);
    } else {
      // Otherwise, perform the user search
      handleUserSearch();
    }
  };

  const handleUserClick = (userOption) => {
    setSelectedUser(userOption);
    setSearchTerm(userOption.label); // Populate the search input with the user's email
    setSearchResults([]); // Clear the search results
    setShowSearchResults(false); // Hide the search results when a user is selected
  };

  const handleAddChannelClick = () => {
    setIsModalOpen(true);
  };

  const handleAddChannel = async () => {
    // Implement the channel creation logic here
    if (selectedUser && channelName) {
      console.log(`Creating channel "${channelName}" for user ${selectedUser.label}`);
    }

    setIsModalOpen(false);
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
          <hr />
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
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
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </label>
          {showSearchResults && ( // Conditionally render search results
            <div className="user-search-results">
              {searchResults.map((userOption) => (
                <div
                  key={userOption.value}
                  className={`user-option ${userOption.value === (selectedUser && selectedUser.value) ? 'selected' : ''}`}
                  onClick={() => handleUserClick(userOption)}
                >
                  {userOption.label}
                </div>
              ))}
            </div>
          )}
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
