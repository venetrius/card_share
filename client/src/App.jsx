import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Common/Footer.jsx';
import Header from './Common/Header.jsx';
import Main from './Main.jsx';
import Notifications from './Common/Notifications.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081",
      modalShow: false,
      connection: null,
      user : null
    };
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
    let connection = socketIOClient(this.state.endpoint);
    // Import and assign socket event handlers
    const eventHandlers = require('./socket/events')(App);
    for (var key in eventHandlers) {
      connection.on(key, eventHandlers[key]);
    }
    this.setState({connection : connection});
  }

  getUser(){
    this.state.connection.emit('get_user','1000001');
  }

  connectWith(user_id){
    this.state.connection.emit('request_connection',user_id);
  }

  getCategories(){
    this.state.connection.emit('get_categories','1000001');
  }

  getAttendees(){
    this.state.connection.emit('get_attendees','1000001');
  }
  
  logOut(){
    this.state.connection.emit('log_out','');
  }

  showNotifications(){
    this.setState({ modalShow: true })
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false });
    console.log(this.state.categories)
    return (
      <div>
        <Header showNotifications={this.showNotifications} socket={this.state.connection} user={this.state.user} logOut={() =>this.logOut()}/>
        <button onClick={() => this.getUser() } > User details </button>
        <button onClick={() => this.getCategories() } > Categories </button>
        <button onClick={() => this.getAttendees() } > Attendees </button>
        <button onClick={() => this.connectWith() } > Connect </button>
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