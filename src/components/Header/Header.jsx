import './Header.css';
import { Avatar } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '../../services/authService';

const Header = () => {
  const handleLogout = () => {
    authService.logout(); 

  };

  return (
    <div className="header">
      <div className="dev header-left">
        <Avatar
          className="header-avatar"
          alt='Justin Cantillo'
          src=''
        />
        <AccessTime />
      </div>
      <div className="header-search">
        <Search />
        <input placeholder='Search here' />
      </div>
      <div className="div header-right">
        <LogoutIcon onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
