import EventEmitter from 'eventemitter3';
import socket from './socket';

const emitter = new EventEmitter();
socket.on('update', (data: any) => {
  console.log('on update:', data);
  emitter.emit('update', data);
});

export default emitter;
