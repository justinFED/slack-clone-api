import React, { useEffect, useState } from 'react';
import authService from '../../services/authService';
import './ChannelList.css'

function ChannelsList() {
  const [userChannels, setUserChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUserChannels() {
      try {
        const channels = await authService.getAllUserChannels();
        setUserChannels(channels.data || []); 
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user channels:', error);
        setIsLoading(false);
      }
    }

    fetchUserChannels();
  }, []);

  const filteredChannels = isLoading
    ? []
    : userChannels.filter((channel) =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="channel-list-container">
      <h2 className="channel-list-heading">Channel List</h2>
      <input
        type="text"
        className="channel-list-search-input"
        placeholder="Search channels"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p className="channel-list-loading">Loading...</p>
      ) : (
        <div>
          <select className="channel-list-select">
            {filteredChannels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
          {filteredChannels.length === 0 && (
            <p className="channel-list-no-channels">No channels found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ChannelsList;
