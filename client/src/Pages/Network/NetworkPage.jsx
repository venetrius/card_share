import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class NetworkPage extends Component {

  render(){
    return (
      <div>
        Hello from the NetworkPage!!
        <CardDeck>
          <BusinessCard/>
          <BusinessCard/>
          <BusinessCard/>
        </CardDeck>
      </div>
    );
  }
}

export default NetworkPage;