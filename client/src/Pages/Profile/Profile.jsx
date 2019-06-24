import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfilePage from './ProfilePage.jsx';

class Profile extends Component {

  render(){
    return (
      <Switch>
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
    );
  }
}

export default Profile;