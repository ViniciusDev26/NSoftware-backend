import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createSizeDTO } from '../dtos/createSize.dtos';
import { sizeService } from '../service/size.service';

@Controller('/size')
export class sizeController {
  constructor(readonly service: sizeService) {}

  @Post('/')
  async createSize(
    @Body('productId') productId: number,
    @Body('orderId') orderId: number,
    @Body('size') size: string,
  ) {
    const body: Partial<createSizeDTO> = {
      productId,
      orderId,
      size,
    };
    const save = await this.service.save(body);
    return save;
  }

  @Get('/')
  async getSizes(@Query('productId') productId: number) {
    const idProduct: Partial<createSizeDTO> = { productId };
    const get = await this.service.getsizes(idProduct);
    return get;
  }

  @Delete('/')
  async deleteSize(@Query('id') id: number) {
    const identificador: Partial<createSizeDTO> = { id };
    const deleteSize = await this.service.deleteSize(identificador);
    return deleteSize;
  }

  @Patch('/')
  async patchSize(
    @Query('id') id: number,
    @Body('size') size: string,
    @Body('orderId') orderId: number,
    @Body('productId') productId: number,
  ) {
    const body: createSizeDTO = {
      id,
      productId,
      orderId,
      size,
    };
    const patchSize = await this.service.patchSize(body);
    return patchSize;
  }
}
