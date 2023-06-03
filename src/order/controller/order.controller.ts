import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { orderService } from '../service/order.service';

@Controller('/order')
export class orderController {
  constructor(private readonly service: orderService) {}

  @Get('/')
  async getOrder(@Body() query) {
    const allOrder = await this.service.getOrders(query);
    return allOrder;
  }
  @Post('/')
  async makeOrder(@Body() body) {
    const service = await this.service.makeOrder(body);
    return service;
  }

  @Patch('/')
  async pathOrder(@Body() query) {
    const changeOrder = await this.service.changeOrder(query);
    return changeOrder;
  }
}
