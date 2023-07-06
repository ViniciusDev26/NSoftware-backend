import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { getEmployeeDTO } from '../dtos/getEmployee.dtos';
import { uploadEmployeeDTO } from '../dtos/upload-employee.dto';
import { employeeService } from '../service/employee.service';

@Controller('/employee')
export class employeeController {
  constructor(readonly service: employeeService) {}

  @Get('/')
  async getEmployee(@Query() params: getEmployeeDTO) {
    const employees = await this.service.getEmployee(params);
    return employees;
  }

  @Patch('/')
  async patchEmployee(@Body() param: uploadEmployeeDTO) {
    const patch = await this.service.patchRole(param);
    return patch;
  }
}
