import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from '../services/address.service';

@Controller('/address')
export class AddressController {
  constructor(private readonly service: AddressService) {}
  @Post('/')
  async registerAddres(@Body() body) {
    const registerAddress = await this.service.register(body);
    return registerAddress;
  }
}
