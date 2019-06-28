import React, {Component} from 'react';
import BasicCard from '../../Common/BasicCard.jsx';
import ConnectedCard from '../../Common/ConnectedCard.jsx';
import SharedCard from '../../Common/SharedCard.jsx';
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
            <BasicCard profile={this.props.profile}/>
          </Tab>


          <Tab eventKey="profile" title="Connected"> 
            <ConnectedCard profile={this.props.profile}/>
          </Tab>


          <Tab eventKey="topics" title="Shared">
            <SharedCard profile={this.props.profile}/>
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