import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCardNew.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class NetworkPage extends Component {

  render(){
    return (
      <div>
        Hello from the NetworkPage!!
        <CardDeck>
          {this.props.attendees.map((attendee) =>
          <BusinessCard
            attendee={attendee}
            key={ attendee.id }/>
        )}
        </CardDeck>
      </div>
    );
  }
}

export default NetworkPage;