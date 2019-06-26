import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './Pages/Profile/ProfilePage.jsx';
import NetworkPage from './Pages/Network/NetworkPage.jsx';
import Messages from './Pages/Messages/Messages.jsx';
import Contacts from './Pages/Contacts/Contacts.jsx';

class Main extends Component {
  render(){
    console.log(this.props.categories)
    console.log(this.props.subCategories)
    return (
    
      <main style={{ minHeight: '70vh' }}>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/profile" render={(routeProps) => (
            <ProfilePage {...routeProps} categories={this.props.categories}subCategories={this.props.subCategories}/>
          )}/>
          <Route path="/network" render={(routeProps) => (
            <NetworkPage {...routeProps} attendees={this.props.attendees}/>
          )}/>
          <Route path="/messages" component={Messages} />
          <Route path="/contacts" component={Contacts} />
        </Switch>
      </main>
    );
  }
}

export default Main;