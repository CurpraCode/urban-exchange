// coin.schema.ts
import * as mongoose from 'mongoose';

export const CoinSchema = new mongoose.Schema({
  currencyFrom: {
    type: String,
    required: true,
  },
  currencyTo: {
    type: String,
    required: true,
  },
  currencyFromAmount: {
    type: String,
    required: true,
  },
  currencyToAmount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Live Price', 'Exchanged'],
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: true,
  },
});
