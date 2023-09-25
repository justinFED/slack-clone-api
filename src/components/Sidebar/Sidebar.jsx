import React, { useState, useEffect } from "react";
import { FiberManualRecord } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import ChannelsList from "../Channels/ChannelList";
import NewMessage from "../NewMessage/NewMessage";

import "./Sidebar.css";

const Sidebar = ({ history }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(true);

  const [createdChannels, setCreatedChannels] = useState([]);

  const navigate = useNavigate();

  const addChannelToList = (channel) => {
    console.log("Adding channel:", channel.name);
    setCreatedChannels((prevChannels) => [...prevChannels, channel]);
  };

  const handleUserSearch = async () => {
    try {
      const authHeaders = {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid")
      };

      const response = await authService.searchUsers(authHeaders);

      const userList = response.data;

      const filteredUsers = userList.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const options = filteredUsers.map((user) => ({
        value: user.id,
        label: user.email
      }));

      setUserOptions(options);
      setSearchResults(options);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error fetching list of users:", error);
    }
  };

  const handleSearchInputChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      setSearchResults([]);
      setShowSearchResults(false);
    } else {
      handleUserSearch();
    }
  };

  const createChannel = async (channelName, selectedUserEmail) => {
    try {
      const channelResponse = await authService.createChannel(channelName, [
        selectedUserEmail
      ]);
  
      if (channelResponse.status === 200) {
        console.log("Channel created successfully.");
        const createdChannel = {
          name: channelName,
        };
        addChannelToList(createdChannel);
        setIsModalOpen(false);
        history.push(`/channel/${channelName}/user/${selectedUser.value}`);
      } else {
        console.error("Error creating channel:", channelResponse);
        if (channelResponse.data && channelResponse.data.errors) {
          console.log("Channel creation errors:", channelResponse.data.errors);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleAddChannelClick = () => {
    setIsModalOpen(true);
  };

  const handleUserClick = (userOption) => {
    console.log("Selected User:", userOption);

     if (userOption && userOption.value && userOption.label) {
    setSelectedUser(userOption);
    setSearchTerm(userOption.label);
    setSearchResults([]);
    setShowSearchResults(false);
  } else {
    console.error("Invalid user option:", userOption);
  }
};

const handleAddChannel = async () => {
  if (channelName && selectedUser) {
    createChannel(channelName, selectedUser.label);
  } else {
    console.error(
      "Invalid input: Either selectedUser or channelName is missing."
    );
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
        <NewMessage />
        <hr />
        <h2 onClick={handleAddChannelClick}>Add Channel</h2>
        <ul className="channel-list">
          {createdChannels.map((channel, index) => (
            <li key={index}>
              <Link
                to={`/channel/${channel.name}/user/${selectedUser ? selectedUser.value : ""}`}
              >
                # {channel.name}
              </Link>
            </li>
          ))}
        </ul>

        <hr />
        <ChannelsList />
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
                className={`user-option ${
                  userOption.value === (selectedUser && selectedUser.value)
                    ? "selected"
                    : ""
                }`}
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
