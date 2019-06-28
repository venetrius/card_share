import React, {Component} from 'react';
import CardShared from '../../Common/Partials/CardShared.jsx';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Categories from './Categories.jsx';

class ProfilePage extends Component {

  render(){
    console.log("From profile: ", this.props);
    return (
      <div>
        Hello from the ProfilePage!!

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Basic">
            Card Basic Profile Here!
          </Tab>


          <Tab eventKey="profile" title="Connected"> 
            Card Connected Profile Here!
          </Tab>


          <Tab eventKey="topics" title="Shared">
            <CardShared user={this.props.user}/>
          </Tab>
        </Tabs>

        <div>
          <Categories categories={this.props.categories} subCategories={this.props.subCategories} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;