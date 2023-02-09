// coin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coin, CoinDocument } from './model/coin.model';
import { Cron } from '@nestjs/schedule/dist';
import { CoinGateway } from './coin.gateway';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import { ExchangeDto } from './dto/exchange';

@Injectable()
export class CoinService {
  constructor(
    @InjectModel('Coin') private readonly coinModel: Model<CoinDocument>,
    // private server: CoinGateway,
    private readonly httpService: HttpService,
  ) {}
@Cron(0 10 * * * *)
  async fetchRates() {
    try {
      const response = await this.httpService.get(
        `${process.env.API_URL}/BTC/?invert={invert}&apikey=${process.env.API_KEY}`,
      );
      const coin = await lastValueFrom(response);

      const ratesArray = coin.data.rates;
      const data = ratesArray.map((item) => {
        return {
          currencyFrom: 'BTC',
          currencyTo: item.asset_id_quote,
          rate: item.rate,
          createdAt: item.time,
          type: 'live',
        };
      });
      this.coinModel.create(data, (err)=>{
        if (err){
          throw new Error(err)
        }
      })
  
      return data
    } catch (error) {
      console.error(error);
    }
  }

  async exchangeCoin(data: ExchangeDto) {
    try {
      const response = await this.httpService.get(
        `${process.env.API_URL}/${data.currencyFrom}/${data.currencyTo}?apikey=${process.env.API_KEY}`,
      );

      const coin = await lastValueFrom(response);

      const rate: number = data.currencyFromAmount * coin.data.rate;
      const coinData: Record<string, unknown> = {
        ...data,
        currencyToAmount: rate,
        createdAt: coin.data.time,
        type: 'exchange',
      };
      const exchange = new this.coinModel(coinData);
      const result = await exchange.save();
      //this.server.server.emit('hi', result);

      return result;
    } catch (error) {
      console.error(error);
      ``;
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
