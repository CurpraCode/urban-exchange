// coin.interface.ts
export interface Coin {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
}
