import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class ContactsPage extends Component {

  render(){
    return (
      <div>
        Hello from the ContactsPage!!
        <CardDeck>
          <BusinessCard/>
          <BusinessCard/>
          <BusinessCard/>
        </CardDeck>
      </div>
    );
  }
}

export default ContactsPage;