import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Common/Footer.jsx';
import Header from './Common/Header.jsx';
import Main from './Main.jsx';
import Notifications from './Common/Notifications.jsx';
import eventHandlers from './socket/events.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081",
      modalShow: false
    };
    this.connection = null;

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
    
    for (var key in eventHandlers) {
      App.connection.on(key, eventHandlers[key]);
    }

    this.connection.on('user', function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg)
    });

    this.connection.on('categories', function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg)
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    });

  }



  getUser(){
    this.connection.emit('get_user','1000001');
  }

  connectWith(user_id){
    this.connection.emit('request_connection',user_id);
  }

  getCategories(){
    this.connection.emit('get_categories','1000001');
  }

  showNotifications(){
    this.setState({ modalShow: true })
  }


  render(){
    let modalClose = () => this.setState({ modalShow: false });
    console.log(this.state.categories)
    return (
      <div>
        <Header showNotifications={this.showNotifications}/>
        <button onClick={() => this.getUser() } > User details </button>
        <button onClick={() => this.getCategories() } > Categories </button>
        <Notifications
          show={this.state.modalShow}
          onHide={modalClose}
        />
        <Main categories={this.state.categories} subCategories={this.state.subCategories}/>
        <Footer/>
      </div>
    );
  }
}

export default App;