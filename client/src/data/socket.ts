import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:1337');
socket.emit('get-update');

export default socket;
