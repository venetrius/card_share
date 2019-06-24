import React, {Component} from 'react';

class Footer extends Component {

  render(){
    return (
      <div className="navbar">
        <a className="active" href="#"><i className="fa fa-user"></i> Profile</a> 
        <a href="#"><i className="fa fa-share-alt-square"></i> Network</a> 
        <a href="#"><i className="fa fa-fw fa-envelope"></i> Messages</a> 
        <a href="#"><i className="fa fa-fw fa-folder"></i> Contacts</a>
      </div>
    );
  }
}

export default Footer;