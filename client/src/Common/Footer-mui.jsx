import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom'

function Footer() {
    const [value, setValue] = React.useState('recents');

    function handleChange(event, newValue) {
      setValue(newValue);
    }

    return (
      <BottomNavigation value={value} onChange={handleChange} className="stickToBottom">
        <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/profile" label="Profile" value="profile" icon={<i className="fa fa-user"></i>} />
        <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/network" label="Network" value="network" icon={<i className="fa fa-share-alt-square"></i>} />
        <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/messages" label="Messages" value="messages" icon={<i className="fa fa-fw fa-envelope"></i>} />
        <BottomNavigationAction component={Link} style={{ textDecoration: 'none' }} to="/contacts" label="Contacts" value="contacts" icon={<i className="fa fa-fw fa-folder"></i>} />
      </BottomNavigation>
    );
}


export default Footer;
