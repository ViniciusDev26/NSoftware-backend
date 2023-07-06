import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { deleteOrderDTO } from '../dtos/delete-order.dto';
import { getAllOrdersDTO } from '../dtos/getAllOrders.dto';
import { GetOrdertDTO } from '../dtos/getOrder.dto';
import { postOrdertDTO } from '../dtos/post-order.dto';
import { uploadOrdertDTO } from '../dtos/upload-order.dto';
import { orderService } from '../service/order.service';

@Controller('/order')
export class orderController {
  constructor(private readonly service: orderService) {}

  @Get('/')
  async getOrder(@Query() body: getAllOrdersDTO) {
    const allOrder = await this.service.getOrders(body);
    return allOrder;
  }

  @Post('/')
  async makeOrder(@Body() body: postOrdertDTO) {
    const service = await this.service.makeOrder(body);
    return service;
  }

  @Patch('/')
  async pathOrder(@Body() query: uploadOrdertDTO) {
    const changeOrder = await this.service.changeOrder(query);
    return changeOrder;
  }

  @Delete('/')
  async deleteOrder(@Query() id: deleteOrderDTO) {
    const deleteOrder = await this.service.deleteOrder(id);
    return deleteOrder;
  }
}
