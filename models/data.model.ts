export interface ISecurityStoredData {
  symbol: string;
  description: string;
  quantity: number;
  purchasePrice: number;
}

export interface ISecurityData extends ISecurityStoredData {
  currentPrice: number;
  change: ICountPair;
  total: ICountPair;
}

interface ICountPair {
  price: number;
  percentage: number;
}