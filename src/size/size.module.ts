import { Module } from '@nestjs/common';
import { sizeController } from './controllers/size.controller';
import { sizeService } from './service/size.service';

@Module({
  controllers: [sizeController],
  providers: [sizeService],
})
export class moduleSize {}
