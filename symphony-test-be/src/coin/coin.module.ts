// coin.module.ts
import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinSchema } from './model/coin.model';
import { CoinGateway } from './coin.gateway';
// import { Server, Socket } from 'socket.io';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coin', schema: CoinSchema }]),
    HttpModule,
  ],
  providers: [CoinService],
  controllers: [CoinController],
})
export class CoinModule {}
