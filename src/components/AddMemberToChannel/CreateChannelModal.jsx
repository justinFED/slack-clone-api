import React, { useState } from 'react';
import authService from '../../services/authService';

const CreateChannelModal = ({ onClose }) => {
  const [channelName, setChannelName] = useState('');
  const [userIds, setUserIds] = useState('');

  const handleCreateChannel = async () => {
    try {
      // Call the createChannel function from authService
      const result = await authService.createChannel(channelName, userIds);

      // Handle the result as needed (e.g., show a success message)
      console.log('Channel created successfully:', result);

      // Optionally, you can close the modal and reset the form
      onClose();
      setChannelName('');
      setUserIds('');
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Channel</h2>
        <form>
          <div>
            <label>Channel Name:</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>User IDs (comma-separated):</label>
            <input
              type="text"
              value={userIds}
              onChange={(e) => setUserIds(e.target.value)}
              required
            />
          </div>
          <button onClick={handleCreateChannel}>Create Channel</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
