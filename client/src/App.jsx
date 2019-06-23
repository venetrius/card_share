import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';

class App extends Component {
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