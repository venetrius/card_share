import React, {Component} from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

class App extends Component {
  render(){
    return (
      <div>
        <Header/>
        <div>Hello World</div>
        <Footer/>
      </div>
    );
  }
}

export default App;