import * as FinAPI from './finance.api';
import { ISecurityStoredData, ISecurityData } from '../models/data.model';

// Hardcoded dummy data, simulating a database
const database: ISecurityStoredData[] = [{
  symbol: 'WORK',
  description: 'Slack',
  quantity: 2,
  purchasePrice: 1.2
}];

export let current: ISecurityData[] = [];

export async function refresh() {
  current = [...database] as ISecurityData[];

  current = await Promise.all(
    current.map(async (e) => {
      const { data } = await FinAPI.getQuote(e.symbol);
      const currentPrice = data.c;

      return {
        ...e,
        currentPrice
      };
    })
  );
}