import React, { useState, useEffect } from 'react';
import { FiberManualRecord } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import authService from '../../services/authService';
import { Link } from 'react-router-dom';
import sendMessageToUser from '../Chat/sendMessageToUser'; // Import sendMessageToUser

import './Sidebar.css';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(true);

  const [createdChannels, setCreatedChannels] = useState([]);

  const addChannelToList = (channel) => {
    setCreatedChannels((prevChannels) => [...prevChannels, channel]);
  };

  const handleUserSearch = async () => {
    try {
      const authHeaders = {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'uid': localStorage.getItem('uid'),
      };

      const response = await authService.searchUsers(authHeaders);

      const userList = response.data;

      const filteredUsers = userList.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const options = filteredUsers.map((user) => ({
        value: user.id,
        label: user.email,
      }));

      setUserOptions(options);
      setSearchResults(options);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error fetching list of users:', error);
    }
  };

  const handleSearchInputChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === '') {
      setSearchResults([]);
      setShowSearchResults(false);
    } else {
      handleUserSearch();
    }
  };

  const handleAddChannelClick = () => {
    setIsModalOpen(true);
  };

  const handleUserClick = (userOption) => {
    setSelectedUser(userOption);
    setSearchTerm(userOption.label);
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleAddChannel = async () => {
    if (selectedUser && channelName) {
      // Check if the channel name already exists in createdChannels
      const isChannelNameTaken = createdChannels.some((channel) => channel.name === channelName);
  
      if (isChannelNameTaken) {
        // Display an error message or handle the duplicate channel name case
        window.alert('Channel name is already taken.');
      } else {
        const newChannel = {
          name: channelName,
          user: selectedUser.label,
        };
  
        try {
          // Use sendMessageToUser to send a message to the selected user
          await sendMessageToUser(selectedUser.value, `Hello, ${selectedUser.label}!`);
          addChannelToList(newChannel);
  
          setChannelName('');
          setSelectedUser(null);
          setIsModalOpen(false);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    }
  };
  

  useEffect(() => {
    handleUserSearch();
  }, []);

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
          <ul className="channel-list">
        {createdChannels.map((channel, index) => (
          <li key={index}>
            <Link to={`/channel/${channel.name}`}># {channel.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Channel List</h2>
          <ul>


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
          {showSearchResults && (
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
