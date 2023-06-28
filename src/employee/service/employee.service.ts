import { Injectable } from '@nestjs/common';
import { employeeRepository } from 'src/database/repositories/prisma/employee-prisma.repository';
import { getEmployeeDTO } from '../dtos/getEmployee.dtos';

type employeeProps = {
  companyId: string;
  AddressId: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  wage: number;
  obs: string;
  codeEmployee: number;
  id: string;
};

@Injectable()
export class employeeService {
  constructor(readonly repository: employeeRepository) {}

  async getEmployee(params: getEmployeeDTO) {
    const get = await this.repository.getEmployee(params);
    return get;
  }

  async patchRole(param: employeeProps) {
    const patch = await this.repository.patchEmployee(param);
    return patch;
  }
}
