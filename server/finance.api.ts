import axios from 'axios';
import config from '../config';

export async function getQuote(symbol: string) {
  return axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${config.finnhubToken}`);
}
