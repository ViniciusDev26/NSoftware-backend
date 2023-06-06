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

    if (getStatus.codeEmployee) {
      const getStatusForCompany = await this.prisma.companys.findFirst({
        where: {
          codeEmployee: getStatus.codeEmployee,
        },
      });

      const getRoleUser = await this.prisma.account.findFirst({
        where: {
          id: getStatus.id,
        },
      });
      return {
        statusCompany: getStatusForCompany.access,
        roleUser: getRoleUser.roleId,
        codeEmployee: getRoleUser.codeEmployee,
        companyID: getRoleUser.companyId,
      };
    }
  }
}
