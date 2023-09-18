import './Header.css'
import { Avatar } from '@mui/material';
import { AccessTime, HelpOutline } from '@mui/icons-material';
import { Search } from '@mui/icons-material';

const Header = () => {
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
            <input placeholder='Search here'/>
      </div>
      <div className="div header-right">
        <HelpOutline />
      </div>
    </div>
  )
}

export default Header