import EventEmitter from 'eventemitter3';
import socket from './socket';

const ee = new EventEmitter();
socket.on('connection', (data: any) => {
  console.log('data:', data);
});
