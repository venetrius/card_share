import React, {Component} from 'react';
import BusinessCard from '../../Common/BusinessCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck';
import Categories from './Categories.jsx';

class ProfilePage extends Component {

  render(){
    console.log("From profile: ", this.props);
    return (
      <div>
        Hello from the ProfilePage!!
        <CardDeck>
          <BusinessCard/>
          <BusinessCard/>
          <BusinessCard/>
        </CardDeck>

        <div>
          <Categories categories={this.props.categories} subCategories={this.props.subCategories} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;