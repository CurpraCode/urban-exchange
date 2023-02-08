// coin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coin } from './interface/coin.interface';
import { Coin, CoinDocument } from './model/coin.model';
import { Cron } from '@nestjs/schedule/dist';
import { CoinGateway } from './coin.gateway';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { ExchangeDto } from './dto/exchange';

@Injectable()
export class CoinService {
  constructor(
    @InjectModel('Coin') private readonly coinModel: Model<CoinDocument>,
    // private server: CoinGateway,
    private readonly httpService: HttpService,
  ) {}
  async fetchRates() {
    try {
      const response = await this.httpService.get(
        `${process.env.API_URL}/BTC/USD?apikey=${process.env.API_KEY}`,
      );
      // const coins: [] = response.data;
      // // for (const coin of coins) {
      // //const existingCoin = await this.coinModel.find();

      // const newCoin = new this.coinModel(coins);
      // const data = await newCoin.save();

      const data = await response.pipe(map((data) => data.data));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async exchangeCoin(data: ExchangeDto) {
    try {
      const response = await this.httpService.get(
        `${process.env.API_URL}/${data.currencyFrom}/${data.currencyTo} ?apikey=${process.env.API_KEY}`,
      );

      const coin = await response.pipe(map((data) => data.data));
      const rate = data.currencyFromAmount * coin.rate,
      const coinData : Record<string, unknown> = {
        ...data,
        currencyToAmount: rate
      };
      const exchange = new this.coinModel(coinData);
      const result = await exchange.save();

      return result;
    } catch (error) {
      console.error(error);``
    }
  }

  testSock() {
    // this.server.server.emit('hi', 'hello');
    //this.socket.send('message', 'sent');
    return 'hey';
  }
  async getRates() {
    return await this.coinModel.find();
  }
}
