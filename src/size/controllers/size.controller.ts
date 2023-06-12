import { Body, Controller, Post } from '@nestjs/common';
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
}
