import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as io from 'socket.io-client';

// TODO @Avidor -> @Ran: Refactor this outside into the upcoming DAL
const socket = io.connect('http://localhost:1337');
socket.emit('ask-update');
socket.on('update', (data: any) => {
  console.log('set-update', data);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);