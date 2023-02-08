// coin.controller.ts
import { Controller, Get } from '@nestjs/common';
// import { Server, Socket } from 'socket.io';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  // onModuleInit() {
  // setInterval(async () => {
  //   try {
  //     const rates = await this.coinService.fetchRates();
  //     // this.server.emit('rates', rates);
  //   } catch (error) {
  //     throw new WsException(error);
  //   }
  // }, 60000);
  // }

  @Get()
  async getRates() {
    return await this.coinService.getRates();
  }
  @Get('test')
  getTest() {
    this.coinService.testSock();
  }
}
