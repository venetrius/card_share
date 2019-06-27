import React, {Component} from 'react';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Footer extends Component {

  render(){
    return (
      <Navbar fixed="bottom" className="fixed-bottom" bg="light" variant="light">
        <Nav className="mr-auto">
          <LinkContainer to="/profile">
            <NavItem><i className="fa fa-user"></i>Profile</NavItem>
          </LinkContainer>
          <LinkContainer to="/network">
            <NavItem><i className="fa fa-share-alt-square"></i>Network</NavItem>
          </LinkContainer>
          <LinkContainer to="/messages">
            <NavItem><i className="fa fa-fw fa-envelope"></i>Messages</NavItem>
          </LinkContainer>
          <LinkContainer to="/contacts">
            <NavItem><i className="fa fa-fw fa-folder"></i>Contacts</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default Footer;

{/* <div className="navbar">
<a className="active" href="/profile"><i className="fa fa-user"></i> Profile</a> 
<a href="/network"><i className="fa fa-share-alt-square"></i> Network</a> 
<a href="/messages"><i className="fa fa-fw fa-envelope"></i> Messages</a> 
<a href="/contacts"><i className="fa fa-fw fa-folder"></i> Contacts</a>
</div> */}