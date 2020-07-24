import axios from 'axios';

const API_KEY = 'bsdg7k7rh5retdgr8ro0';

export async function getQuote(symbol: string) {
  return axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
}
