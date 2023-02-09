import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoinDocument = Coin & Document;

@Schema()
export class Coin {
  @Prop()
  currencyFrom: string;

  @Prop()
  currencyTo: string;

  @Prop()
  currencyFromAmount: string;

  @Prop()
  currencyToAmount: string;

  @Prop()
  type: string;

  @Prop()
  rate: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
