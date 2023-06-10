import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class authorizationRepository {
  constructor(readonly prisma: PrismaService) {}
  async getStausByCompany(email) {
    const getStatus = await this.prisma.account.findUnique({
      where: {
        email,
      },
    });
    const { access, id } = await this.prisma.companys.findUnique({
      where: {
        id: getStatus.companyId,
      },
    });

    if (getStatus.roleId) {
      const role = await this.prisma.role.findUnique({
        where: {
          id: getStatus.roleId,
        },
      });
      return {
        statusCompany: access,
        companyID: id,
        roleUser: role.role,
      };
    }

    return {
      statusCompany: access,
      companyID: id,
      roleUser: 'Sem função',
    };
  }
}
