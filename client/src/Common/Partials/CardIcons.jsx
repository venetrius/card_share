import React, {Component} from 'react';

class CardIcons extends Component {

  render(){
    const attendee = this.props.attendee;

    return (
      <span>
        <i class="far fa-address-card"></i>
        <i class="far fa-bell"></i>
      </span>
    );
  }
}

export default CardIcons;
