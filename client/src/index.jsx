// Application entrypoint.

// Load up the application styles

// require('../styles/application.scss');

// Render the top-level React component
// import 'bootstrap/dist/css/bootstrap..min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('react-root'));

// ReactDOM.render(<App/>, document.getElementById('react-root'));
