import * as FinAPI from './finance.api';
import { ISecurityStoredData, ISecurityData } from '../models/data.model';

// Hardcoded dummy data, simulating a database
const database: ISecurityStoredData[] = [
  {
    symbol: 'WORK',
    description: 'Slack Technologies, Inc. Class A Common Stock',
    quantity: 2,
    purchasePrice: 30.378
  },

  {
    symbol: 'TSLA',
    description: 'Tesla Inc',
    quantity: 2,
    purchasePrice: 1201.73
  },

  {
    symbol: 'MSFT',
    description: 'Microsoft Corporation',
    quantity: 70,
    purchasePrice: 88.72
  }
];

export let current: ISecurityData[] = [];

export async function refresh() {
  current = [...database] as ISecurityData[];

  current = await Promise.all(
    current.map(async (e) => {
      const { data } = await FinAPI.getQuote(e.symbol);
      return {
        ...e,
        currentPrice: data.c,
        change: {
          price: (data.c - data.pc),
          percentage: (data.c / data.pc - 1) * 100
        },
        total: {
          price: (data.c - e.purchasePrice) * e.quantity,
          percentage: (data.c / e.purchasePrice - 1) * 100
        }
      };
    })
  );
}