import EventEmitter from 'eventemitter3';
import socket from './socket';
import { ISecurityData, IData } from '../../../models/data.model';

const emitter = new EventEmitter();
emitter.on('get-update', () => {
  console.log('Requesting update');
  socket.emit('get-update');
});

socket.on('update', (data: ISecurityData[]) => {
  const aggregated: IData = {
    stocks: data.map((e) => ({
      ...e,
      change: {
        price: Number(e.change.price.toFixed(2)),
        percentage: Number(e.change.percentage.toFixed(2)),
      },
      total: {
        price: Number(e.total.price.toFixed(2)),
        percentage: Number(e.total.percentage.toFixed(2)),
      },
    })),
    totalValue: data.reduce((acc, curr) => acc + (curr.currentPrice * curr.quantity), 0),
    totalChange: data.reduce((acc, curr) => acc + curr.change.price, 0),
    totalGL: {
      price: data.reduce((acc, curr) => acc + curr.total.price, 0),
      percentage:
        (data.reduce((acc, curr) => acc + (curr.currentPrice), 0) /
          data.reduce((acc, curr) => acc + (curr.purchasePrice), 0) - 1) * 100
    },
  };

  emitter.emit('update', aggregated);
  console.log('Update received', aggregated);
});

export default emitter;
