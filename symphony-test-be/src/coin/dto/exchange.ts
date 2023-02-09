import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ExchangeDto {
  @ApiProperty()
  @IsNotEmpty()
  currencyFrom: string;

  @ApiProperty()
  @IsNotEmpty()
  currencyTo: string;

  @ApiProperty()
  @IsNotEmpty()
  currencyFromAmount: number;
}
