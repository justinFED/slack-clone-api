import React, { useState } from 'react';
import './ChannelList.css';

function ChannelsList({ createdChannels }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChannels = createdChannels.filter((channel) =>
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
    </div>
  );
}

export default ChannelsList;
