import './Sidebar.css';
import { FiberManualRecord } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';



const Sidebar = () => {
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
      <h2>Add Channel</h2>
      <hr />

      <hr />



      <h2>List of Users</h2>
      <hr />
      </div>

      </div>

 


    </div>
  );
};

export default Sidebar;
