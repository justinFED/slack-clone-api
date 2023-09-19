import React, { useEffect, useState } from 'react';
import authService from '../../services/authService'; // Import authService

function ChannelsList() {
  const [userChannels, setUserChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserChannels() {
      try {
        const channels = await authService.getAllUserChannels();
        setUserChannels(channels);
        setIsLoading(false);
      } catch (error) {
        // Handle error (e.g., display an error message)
        console.error('Error fetching user channels:', error);
        setIsLoading(false);
      }
    }

    fetchUserChannels();
  }, []);

  return (
    <div>
      <h2>Channels</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        Array.isArray(userChannels) ? (
          <select>
            {userChannels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No channels found.</p>
        )
      )}
    </div>
  );
}

export default ChannelsList;
