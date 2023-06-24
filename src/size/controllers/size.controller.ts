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
    @Body('companyId') companyId: number,
    @Body('id') id: number,
    @Body('name') name: string,
  ) {
    const body: Partial<createSizeDTO> = {
      companyId,
      id,
      name,
    };
    const save = await this.service.save(body);
    return save;
  }

  @Get('/')
  async getSizes(@Query('companyId') companyId: number) {
    console.log(companyId);
    const get = await this.service.getsizes(companyId);
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
    @Body('name') name: string,
    @Body('companyId') companyId: number,
  ) {
    const body: createSizeDTO = {
      id,
      name,
      companyId,
    };
    const patchSize = await this.service.patchSize(body);
    return patchSize;
  }
}
