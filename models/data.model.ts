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

export interface IData {
  stocks: ISecurityData[];
  totalValue: number;
  totalChange: number;
  totalGL: ICountPair;
}
