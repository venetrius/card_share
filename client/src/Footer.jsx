import React, {Component} from 'react';

class Footer extends Component {

  render(){
    return (
      <div class="footer">
        <button type="button">Profile</button>
        <button type="button">Network</button>
        <button type="button">Messages</button>
        <button type="button">Cards</button>
      </div>
    );
  }
}

export default Footer;