import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class roleRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(param) {
    const save = await this.prisma.role.create({
      data: param,
    });
    return save;
  }

  async get({ companyId }) {
    const getRoles = await this.prisma.role.findMany({
      where: {
        companyId,
      },
    });
    return getRoles;
  }
}
