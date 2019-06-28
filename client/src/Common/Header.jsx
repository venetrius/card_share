import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar} from 'react-bootstrap';
import OAuth from './Oauth.jsx'


class Header extends Component {

  getOauth(){
    console.log('header props', this.props)
    if(this.props.user){
      return (<Button onClick={this.props.logOut}> LogOut </Button>)
    }
    else if (this.props.socket){
      return (
        <OAuth
        provider='linkedin'
        socket={this.props.socket}
        event= {this.props.event}
      />
      )
    }else{
      return( <Button> Login </Button>)
    }
  }

  render(){
    return (
      <Navbar bg="light" sticky="top">

          <Col xs={6} md={6}>
            <p>Lighthouse Labs Demo Day</p>
          </Col>
          <Col xs={3} md={3}>
            <span onClick={this.props.showNotifications} id="notification-button" className="fa-stack fa-2x has-badge" data-count="4">
              <i className="fa fa-bell fa-stack-1x xfa-inverse" data-count="4b"></i>
            </span>
          </Col>
          <Col xs={3} md={3}>
            {this.getOauth()}
          </Col>

      </Navbar>
    );
  }
}

export default Header;