import React, {Component} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom'

function Footer() {
    const [value, setValue] = React.useState('recents');

    function handleChange(event, newValue) {
      setValue(newValue);
    }

    return (
      <div id="footer">
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/profile" label="Profile" value="profile" icon={<i className="fa fa-user"></i>} />
          <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/contacts" label="Contacts" value="contacts" icon={<i className="fas fa-address-card"></i>} />
          <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/network" label="Network" value="network" icon={<i class="fas fa-users"></i>} />
          <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/messages" label="Messages" value="messages" icon={<i class="fas fa-comment-alt"></i>} />
        </BottomNavigation>
      </div>
    );
}


export default Footer;
