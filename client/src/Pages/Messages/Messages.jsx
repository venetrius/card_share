import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import MessagesPage from './MessagesPage.jsx';

class Messages extends Component {

  render(){
    return (
      <Switch>
        <Route exact path="/messages" component={MessagesPage} />
      </Switch>
    );
  }
}

export default Messages;