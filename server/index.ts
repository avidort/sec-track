import * as express from 'express';
import * as socketio from 'socket.io';
import * as data from './data';

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
  console.log('a user connected');

  emitData(socket);

  setTimeout(() => {
    emitData(socket);
  }, 5000);
});

http.listen(1337, () => {
  console.log('online');
});