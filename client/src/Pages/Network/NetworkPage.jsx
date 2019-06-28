import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCardNew.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class NetworkPage extends Component {

  render(){
    const attendees = this.props.attendees;
    return (
      <div>
        Hello from the NetworkPage!!
        <CardDeck>

          {Object.keys(attendees).map((attendee_key) => (
            <BusinessCard
            attendee={attendees[attendee_key]}
            key={ attendees[attendee_key].id }
            actions={this.props.actions}/>
          ))}

        </CardDeck>
      </div>
    );
  }
}

export default NetworkPage;


// {this.props.attendees.map((attendee) =>
//   <BusinessCard
//     attendee={attendee}
//     key={ attendee.id }/>
// )}