import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'

class Header extends Component {

  render(){
    return (
      <div>
      <p>Hello from Header!</p>
        <Button>
            Login
        </Button>
        <Button onClick={this.props.showNotifications}>
          <i className="far fa-bell"></i>
        </Button>

        <span className="fa-stack fa-2x has-badge" data-count="22">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="far fa-bell fa-stack-1x fa-inverse"></i>
        </span>
      </div>
    );
  }
}

export default Header;