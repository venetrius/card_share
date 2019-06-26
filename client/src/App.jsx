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
    connection.on('message', function(msg){
      App.sendAlert(msg);
      msg=JSON.parse(msg)
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    });
    this.setState({connection : connection});
    console.log(App.state.connection);
  }

  getUser(){
    this.state.connection.emit('get_user','1000001');
  }


  showNotifications(){
    this.setState({ modalShow: true })
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false });
    console.log(this.state.categories)
    return (
      <div>
        <Header showNotifications={this.showNotifications} socket={this.state.connection} user={this.state.user}/>
        <button onClick={() => this.getUser() } > User details </button>
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