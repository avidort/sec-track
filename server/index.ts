import * as express from 'express';
import * as socketio from 'socket.io';

const app = express();
const http = require('http').Server(app);
const io = socketio(http);

app.get('/', (req: any, res: any) => {
  res.send('test');
});

io.on('connection', (socket: any) => {
  console.log('a user connected');
});

http.listen(1337, () => {
  console.log('online');
});