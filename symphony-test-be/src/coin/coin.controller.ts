// coin.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
// import { Server, Socket } from 'socket.io';
import { CoinService } from './coin.service';
import { ExchangeDto } from './dto/exchange';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Post('exchange')
  async exchangeCoin(@Body() data: ExchangeDto) {
    return await this.coinService.exchangeCoin(data);
  }
  @Get()
  async getRates() {
    return await this.coinService.fetchRates();
  }

  @Get('test')
  getTest() {
    this.coinService.testSock();
  }
}
