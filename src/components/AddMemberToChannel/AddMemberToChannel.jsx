import React, { useState } from 'react';
import authService from '../../services/authService';

const AddMemberToChannelModal = ({ onClose }) => {
  const [channelId, setChannelId] = useState('');
  const [memberId, setMemberId] = useState('');

  const handleAddMember = async () => {
    try {
      // Call the addMemberToChannel function from authService
      const result = await authService.addMemberToChannel(channelId, memberId);

      // Handle the result as needed (e.g., show a success message)
      console.log('Member added to channel successfully:', result);

      // Optionally, you can close the modal and reset the form
      onClose();
      setChannelId('');
      setMemberId('');
    } catch (error) {
      console.error('Error adding member to the channel:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Member to Channel</h2>
        <form>
          <div>
            <label>Channel ID:</label>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Member ID:</label>
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
          </div>
          <button onClick={handleAddMember}>Add Member</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberToChannelModal;
