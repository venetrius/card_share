import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class ProfilePage extends Component {

  render(){
    return (
      <div>
        Hello from the ProfilePage!!
        <CardDeck>
          <BusinessCard/>
          <BusinessCard/>
          <BusinessCard/>
        </CardDeck>
      </div>
    );
  }
}

export default ProfilePage;