import * as express from 'express';
import * as socketio from 'socket.io';
import * as data from './data';
import config from '../config';

const app = express();
const http = require('http').Server(app);
const io = socketio(http);

function emitData(socket: any) {
  socket.emit('update', data.current);
}

app.get('/', async (req: any, res: any) => {
  await data.refresh();
  console.log(data.current);
  res.send('data refreshed');
});

io.on('connection', (socket: any) => {
  console.log('Incoming connection', socket.id);
  socket.on('get-update', () => emitData(socket));
  emitData(socket);
});

http.listen(config.serverPort, () => {
  data.refresh();
  console.log('online');
});