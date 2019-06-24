import React, {Component} from 'react';
import BusinessCard from './BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck'

class Network extends Component {

  render(){
    return (
      <div>
        Hello from the Network!!
        <CardDeck>
          <BusinessCard/>
          <BusinessCard/>
          <BusinessCard/>
        </CardDeck>
      </div>
    );
  }
}

export default Network;