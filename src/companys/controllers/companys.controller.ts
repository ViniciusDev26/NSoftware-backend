import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { companyService } from '../services/companys.service';

@Controller('/company')
export class companysController {
  constructor(readonly service: companyService) {}

  @Post('/')
  async createCompany(@Body() body) {
    const saveCompany = await this.service.create(body);
    return saveCompany;
  }

  @Get('/')
  async getCompany(@Query() body) {
    const getCompanys = await this.service.getCompany(body);
    return getCompanys;
  }
}
