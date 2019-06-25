import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import Footer from './Common/Footer.jsx';
import Header from './Common/Header.jsx';
import Main from './Main.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8081"
    };
    this.connection = null;
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
      msg=JSON.parse(msg)
      App.setState({categories: msg.categories, subCategories: msg.subCategories});
    });
  }

  getUser(){
    this.connection.emit('get_user','1000001');
  }

  render(){
    console.log(this.state.categories)
    return (
      <div>
        <button onClick={() => this.getUser() } > User details </button>
        <Header/>
        <Main categories={this.state.categories} subCategories={this.state.subCategories}/>
        <Footer/>
      </div>
    );
  }
}

export default App;