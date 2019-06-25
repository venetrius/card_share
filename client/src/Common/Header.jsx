import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import { Navbar} from 'react-bootstrap';

class Header extends Component {

  render(){
    return (
      <Navbar bg="light" sticky="top">
        <p>Event Title</p>
        <Button>
            Login
        </Button>
        <span onClick={this.props.showNotifications} id="notification-button" className="fa-stack fa-2x has-badge" data-count="4">
          <i className="fa fa-bell fa-stack-1x xfa-inverse" data-count="4b"></i>
        </span>
      </Navbar>
    );
  }
}

export default Header;