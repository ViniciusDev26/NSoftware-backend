import { Body, Controller, Get, Patch } from '@nestjs/common';
import { employeeService } from '../service/employee.service';

@Controller('/employee')
export class employeeController {
  constructor(readonly service: employeeService) {}
  @Get('/')
  async getEmployee(@Body() params) {
    const employees = await this.service.getEmployee(params);
    return employees;
  }

  @Patch('/')
  async patchEmployee(@Body() param) {
    const patch = await this.service.patchRole(param);
    return patch;
  }
}
