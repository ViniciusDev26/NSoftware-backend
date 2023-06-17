import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AddressDTO } from '../dtos/adress.dto';
import { AddressService } from '../services/address.service';

@Controller('/address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post('/')
  async registerAddres(
    @Body('AccountId') AccountId: string,
    @Body('lat') lat: number,
    @Body('lng') lng: number,
    @Body('street') street: string,
    @Body('houseNumber') houseNumber: string,
    @Body('district') district: string,
  ) {
    const bodyKit: AddressDTO = {
      AccountId,
      lat: lat.toString(),
      lng: lng.toString(),
      street,
      houseNumber: parseInt(houseNumber),
      district,
    };
    console.log(typeof lat);
    const registerAddress = await this.service.register(bodyKit);
    return registerAddress;
  }

  @Patch('/')
  async pathAddress(@Body() params) {
    const changeAddress = await this.service.change(params);

    return changeAddress;
  }
}
