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
            key={ attendee.id }
            tagline={ attendee.tagline }
            haves={ attendee.haves }
            wants={ attendee.wants } />
        )}
        </CardDeck>
      </div>
    );
  }
}

export default NetworkPage;

// "id":1000003
// "user_id":1000003
// "event_id":1000001
// "email_address":"gi@gmail.com"
// "first_name":"Gi"
// "last_name":"Gilast"
// "position":null
// "company":null
// "linkedin-link":"https://www.linkedin.com"
// "tagline":null
// "created_at":"2019-06-26T20:22:13.722Z"
// "haves":["1000008","1000010","1000016","1000019","1000023"]
// "wants":["1000008","1000010","1000016","1000019","1000023"]