import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as io from 'socket.io-client';
io.connect('http://localhost:1337');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);