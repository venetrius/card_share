import React, {Component} from 'react';

class CardIcons extends Component {

  render(){
    const attendee = this.props.attendee;

    return (
      <span>
        <i className="far fa-address-card"></i>
        <i className="far fa-bell"></i>
      </span>
    );
  }
}

export default CardIcons;
