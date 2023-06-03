import { Module } from '@nestjs/common';
import { orderController } from './controller/order.controller';
import { orderService } from './service/order.service';

@Module({
  controllers: [orderController],
  providers: [orderService],
})
export class orderModule {}
