import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './Pages/Profile/ProfilePage.jsx';
import NetworkPage from './Pages/Network/NetworkPage.jsx';
import MessagePage from './Pages/Messages/MessagesPage.jsx';
import Contacts from './Pages/Contacts/Contacts.jsx';

class Main extends Component {
  render(){
    return (    
      <main style={{ minHeight: '70vh' }}>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/profile" render={(routeProps) => (
            <ProfilePage {...routeProps} categories={this.props.categories} subCategories={this.props.subCategories} profile={this.props.profile}/>
          )}/>
          <Route path="/network" render={(routeProps) => (
            <NetworkPage {...routeProps} actions={this.props.actions} attendees={this.props.attendees} subCategories={this.props.subCategories}/>
          )}/>
          <Route path="/messages" render={(routeProps) => (
            <MessagePage {...routeProps} categories={this.props.categories} subCategories={this.props.subCategories} user={this.props.user}/>
          )}/>
          <Route path="/contacts" component={Contacts} />
        </Switch>
      </main>
    );
  }
}

export default Main;