// coin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coin } from './interface/coin.interface';
import axios from 'axios';
import { Cron } from '@nestjs/schedule/dist';
import { CoinGateway } from './coin.gateway';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class CoinService {
  private readonly httpService: HttpService;

  constructor(
    @InjectModel('Coin') private readonly coinModel: Model<Coin>,
    private server: CoinGateway,
  ) {}
  // @Cron('0 5 * * * *')
  // create exchange rates
  async fetchRates() {
    try {
      const response = await this.httpService.get(
        `${process.env.SERVER_URL}/BTC/USD?apikey=${process.env.SERVER_URL_API_KEY}`,
      );
      // const coins: [] = response.data;
      // // for (const coin of coins) {
      // //const existingCoin = await this.coinModel.find();

      // const newCoin = new this.coinModel(coins);
      // const data = await newCoin.save();
      response.pipe(
        map((data) => {
          console.log(data.data);
        }),
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  testSock() {
    this.server.server.emit('hi', 'hello');
    //this.socket.send('message', 'sent');
    return 'hey';
  }
  async getRates() {
    return await this.coinModel.find();
  }
}
