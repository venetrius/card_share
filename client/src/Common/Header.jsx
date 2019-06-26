import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import { Navbar} from 'react-bootstrap';
import OAuth from './Oauth.jsx'


class Header extends Component {

  getOauth(){
    if (this.props.socket){
      return (
        <OAuth
        provider='linkedin'
        socket={this.props.socket} 
      />
      )
    }else{
      return( <Button> Login </Button>)
    }
  }

  render(){
    return (
      <Navbar bg="light" sticky="top">
        <p>Event Title</p>
       {this.getOauth()}
        <span onClick={this.props.showNotifications} id="notification-button" className="fa-stack fa-2x has-badge" data-count="4">
          <i className="fa fa-bell fa-stack-1x xfa-inverse" data-count="4b"></i>
        </span>
      </Navbar>
    );
  }
}

export default Header;