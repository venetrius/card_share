import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Profile from './Pages/Profile/Profile.jsx';
import Network from './Pages/Network/Network.jsx';
import Messages from './Pages/Messages/Messages.jsx';
import Contacts from './Pages/Contacts/Contacts.jsx';

class Main extends Component {

  render(){
    return (
      <main style={{ minHeight: '70vh' }}>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/network" component={Network} />
          <Route path="/messages" component={Messages} />
          <Route path="/contacts" component={Contacts} />
        </Switch>
      </main>
    );
  }
}

export default Main;