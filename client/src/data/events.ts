import EventEmitter from 'eventemitter3';
import socket from './socket';
import { ISecurityData, IData } from '../../../models/data.model';

const emitter = new EventEmitter();
emitter.on('get-update', () => socket.emit('get-update'));

socket.on('update', (data: ISecurityData[]) => {
  const aggregated: IData = {
    stocks: data.map((e) => ({
      ...e,
      change: {
        price: +e.change.price.toFixed(2),
        percentage: +e.change.percentage.toFixed(2),
      },
      total: {
        price: +e.total.price.toFixed(2),
        percentage: +e.total.percentage.toFixed(2),
      },
    })),
    total: data.reduce((acc, curr) => acc + curr.total.price, 0),
    total_change: data.reduce((acc, curr) => acc + curr.change.price, 0),
  };
  emitter.emit('update', aggregated);
});

export default emitter;
