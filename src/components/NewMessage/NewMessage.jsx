import React, { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import '../Sidebar/Sidebar.css';

const NewMessage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleSearchInputChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      setSearchResults([]);
    } else {
      try {
        const authHeaders = {
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          expiry: localStorage.getItem("expiry"),
          uid: localStorage.getItem("uid"),
        };

        const response = await authService.searchUsers(authHeaders);

        const userList = response.data;

        const filteredUsers = userList.filter((user) =>
          user.email.toLowerCase().includes(newSearchTerm.toLowerCase())
        );

        setSearchResults(filteredUsers);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  const handleSendMessage = () => {
    if (selectedUser) {
      navigate(`/channel/direct/user/${selectedUser.id}`);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="new-message">
      <div className="new-message-text">
        <h2 onClick={() => setIsModalOpen(true)}>New Message</h2>

        {isModalOpen && (
          <div className="new-message-modal">
            <h1>Direct Message</h1>
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <ul>
              {searchResults.length > 0 && (
                <div className="user-search-dropdown active">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={selectedUser === user ? "selected-user" : ""}
                    >
                      {user.email}
                    </div>
                  ))}
                </div>
              )}
            </ul>
            {selectedUser && (
              <div>
                <p>Selected User: {selectedUser.email}</p>
                <button onClick={() => setIsModalOpen(false)}>Close</button>
                <button onClick={handleSendMessage}>Send Message</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewMessage;
