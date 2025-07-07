export interface BaseStock {
  symbol: string;
  name: string;
  basePrice: number;
  beta: number;
}

export interface Stock extends BaseStock {
  price: number;
}
