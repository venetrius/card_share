import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import ContactsPage from './ContactsPage.jsx';

class Contacts extends Component {

  render(){
    return (
      <Switch>
        <Route exact path="/contacts" component={ContactsPage} />
      </Switch>
    );
  }
}

export default Contacts;