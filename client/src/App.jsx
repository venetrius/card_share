import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8000"
    };
  }

  sendAlert(msg){
    alert(msg);
  }
  
  componentDidMount() {
    const App = this;
    const { endpoint } = this.state;
    let socket = socketIOClient(this.state.endpoint);
    socket.on('chat message', function(msg){
      App.sendAlert(msg);
    });
  }

  render(){
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;