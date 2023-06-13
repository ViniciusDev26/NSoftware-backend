import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetOrdertDTO } from '../dtos/getOrder.dto';
import { orderService } from '../service/order.service';

@Controller('/order')
export class orderController {
  constructor(private readonly service: orderService) {}

  @Get('/')
  async getOrder(
    @Query('companyId') companyId: number,
    @Query('userId') userId: string,
    @Query('page') page: number,
  ) {
    const body: Partial<GetOrdertDTO> = {
      companyId,
      userId,
      page,
    };

    const allOrder = await this.service.getOrders(body);

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

  @Delete('/')
  async deleteOrder(@Query('id') id: number) {
    const identificador: Partial<GetOrdertDTO> = { id };
    const deleteOrder = await this.service.deleteOrder(identificador);
    return deleteOrder;
  }
}
