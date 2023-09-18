import React, { useState } from 'react';
import './SidebarOption.css';
import CreateChannelModal from '../AddMemberToChannel/CreateChannelModal';
import AddMemberToChannelModal from '../AddMemberToChannel/AddMemberToChannel';

const SidebarOption = ({
  Icon,
  title,
  addChannelOption,
  createChannelCallback,
  addMemberOption,
  listAllUsers,
}) => {
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showUserList, setShowUserList] = useState(false); // State for UserList

  const openCreateChannelModal = () => {
    setShowCreateChannelModal(true);
  };

  const openAddMemberModal = () => {
    setShowAddMemberModal(true);
  };

  const openUserList = () => {
    setShowUserList(!showUserList); // Toggle the UserList component visibility
  };

  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption-icon" />}
      {Icon ? (
        <h3 onClick={addMemberOption ? openAddMemberModal : openCreateChannelModal}>{title}</h3>
      ) : (
        <h3
          className={`sidebarOption-${listAllUsers ? 'users' : 'channel'}`}
          onClick={listAllUsers ? openUserList : undefined}
        >
          <span className="sidebarOption-hash">#</span> {title}
        </h3>
      )}

      {showCreateChannelModal && (
        <CreateChannelModal
          onClose={() => setShowCreateChannelModal(false)}
          createChannelCallback={createChannelCallback}
        />
      )}

      {showAddMemberModal && (
        <AddMemberToChannelModal
          onClose={() => setShowAddMemberModal(false)}
        />
      )}

     
    </div>
  );
};

export default SidebarOption;
