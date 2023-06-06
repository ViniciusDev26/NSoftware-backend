import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { roleRepository } from 'src/database/repositories/prisma/role-prisma.repository';

type roleProps = {
  companyId: number;
  role: string;
};

@Injectable()
export class roleService {
  constructor(readonly repository: roleRepository) {}
  async save(param: roleProps) {
    if (!param.companyId) {
      throw new HttpException(
        'Error - Não foi possível buscar cargos',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const saveRole = await this.repository.save(param);
    return saveRole;
  }
}
