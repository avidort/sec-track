import * as express from 'express';
import * as socketio from 'socket.io';
import * as data from './data';
import config from '../config';

const app = express();
const http = require('http').Server(app);
const io = socketio(http);

app.get('/', async (req: any, res: any) => {
  await data.refresh();
  console.log(data.current);
  res.send('data refreshed');
});

io.on('connection', (socket: any) => {
  console.log('Incoming connection', socket.id);
  socket.on('get-update', () => socket.emit('update', data.current));
});

http.listen(config.serverPort, () => {
  data.refresh();
  setInterval(() => data.refresh(), 60 * 1000);
  console.log(`Server listening on :${config.serverPort}`);
});