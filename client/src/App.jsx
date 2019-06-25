import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Common/Footer.jsx';
import Header from './Common/Header.jsx';
import Main from './Main.jsx';
import Notifications from './Common/Notifications.jsx'


class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081"
    };
    this.connection = null;
    this.state = { modalShow: false };
    this.showNotifications=this.showNotifications.bind(this)
  }

  sendAlert(msg){
    alert(msg);
  }
  
  componentDidMount() {
    this.connect();
  }

  connect(){
    const App = this;
    this.connection = socketIOClient(this.state.endpoint);
    this.connection.on('message', function(msg){
      App.sendAlert(msg);
    });
  }

  getUser(){
    this.connection.emit('get_user','1000001');
  }

  showNotifications(){
    this.setState({ modalShow: true })
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div>
        <Header showNotifications={this.showNotifications}/>
        <button onClick={() => this.getUser() } > User details </button>
        <Notifications
          show={this.state.modalShow}
          onHide={modalClose}
        />
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;