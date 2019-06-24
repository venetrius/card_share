import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import NetworkPage from './NetworkPage.jsx';

class Network extends Component {

  render(){
    return (
      <Switch>
        <Route exact path="/network" component={NetworkPage} />
      </Switch>
    );
  }
}

export default Network;