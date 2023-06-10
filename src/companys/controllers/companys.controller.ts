import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { createCompanyDTO } from '../dtos/createCompany.dto';
import { editCompanyDTO } from '../dtos/editCompany.dot';
import { getCompanyDTO } from '../dtos/getCompany.dto';
import { companyService } from '../services/companys.service';

@Controller('/company')
export class companysController {
  constructor(readonly service: companyService) {}

  @Post('/')
  async createCompany(@Body() body: createCompanyDTO) {
    const saveCompany = await this.service.create(body);
    return saveCompany;
  }

  @Get('/')
  async getCompany(@Query() id: getCompanyDTO) {
    const getCompanys = await this.service.getCompany(id);
    return getCompanys;
  }

  @Patch('/')
  async pathCompany(@Body() body: editCompanyDTO) {
    const patch = await this.service.patchEnterprise(body);
    return patch;
  }
}
