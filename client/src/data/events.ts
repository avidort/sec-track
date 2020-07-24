import EventEmitter from 'eventemitter3';
import socket from './socket';

const emitter = new EventEmitter();
socket.on('update', (data: any) => {
  // TODO @Avidor -> @Ran @Hirsh: Normalise server data here;
  // - Count and implement total count
  // - Implement .toFixed for all ICountPair props
  console.log('on update:', data);
  emitter.emit('update', data);
});

export default emitter;
