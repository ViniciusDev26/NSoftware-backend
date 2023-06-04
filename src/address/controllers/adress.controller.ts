import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AddressService } from '../services/address.service';

@Controller('/address')
export class AddressController {
  constructor(private readonly service: AddressService) {}
  @Post('/')
  async registerAddres(@Body() body) {
    const registerAddress = await this.service.register(body);
    return registerAddress;
  }

  @Patch('/')
  async pathAddress(@Body() params) {
    const changeAddress = await this.service.change(params);

    return changeAddress;
  }
}
