import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Common/Footer-mui.jsx';
import Header from './Common/Header.jsx';
import Main from './Main.jsx';
import Notifications from './Common/Notifications.jsx';
const socketEvents = require('./socket/events');
const socketActions = require('./socket/actions');

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081",
      modalShow: false,
      connection: null,
      user : null,
      event : {id : 1000001}
    };
    let actions = socketActions(this)
    for(let action in actions){
      this[action]=actions[action].bind(this)
    }
  }


  sendAlert(msg){
    alert(msg);
  }
  
  componentDidMount() {
    this.connect();
  }

  connect(){
    const App = this;
    let connection = socketIOClient(this.state.endpoint);
    // Import and assign socket event handlers
    const eventHandlers = socketEvents(App);
    for (var key in eventHandlers) {
      connection.on(key, eventHandlers[key]);
    }
    this.setState({connection : connection});
  }

  
  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div>
        <Header showNotifications={this.showNotifications} socket={this.state.connection} user={this.state.user} logOut={() =>this.logOut()} event={this.state.event}/>
        <button onClick={() => this.getUser() } > User details </button>
        <button onClick={() => this.getCategories() } > Categories </button>
        <button onClick={() => this.getAttendees() } > Attendees </button>
        <button onClick={() => this.requestConnection() } > Connect </button>
        <button onClick={() => this.acceptConnection() } > AcceptConnection </button>
        <button onClick={() => this.ignoreConnection() } > IgnoreConnection </button>
        <button onClick={() => this.sendCard() } > sendCard </button>
        <button onClick={() => this.saveCard() } > saveCard </button>
        <button onClick={() => this.deleteCard() } > deleteCard </button>

        <Notifications
          show={this.state.modalShow}
          onHide={modalClose}
        />
        <Main categories={this.state.categories} subCategories={this.state.subCategories} attendees={this.state.attendees}/>
        <Footer/>
      </div>
    );
  }
}

export default App;