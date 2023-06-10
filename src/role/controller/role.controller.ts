import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { roleService } from '../service/role.service';

@Controller('/role')
export class roleController {
  constructor(private readonly service: roleService) {}

  @Post('/')
  async saveRole(@Body() Param) {
    const save = await this.service.save(Param);
    return save;
  }

  @Get('/')
  async getRoles(@Body() Param) {
    const roles = await this.service.getRoles(Param);
    return roles;
  }
}
