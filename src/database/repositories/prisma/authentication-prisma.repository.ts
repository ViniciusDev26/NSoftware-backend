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
      if (getStatus.roleId) {
        const getOrder = await this.prisma.role.findUnique({
          where: {
            id: getStatus.roleId,
          },
        });
        return {
          statusCompany: getStatusForCompany.access,
          roleUser: getOrder.role,
          codeEmployee: getStatus.codeEmployee,
          companyID: getStatusForCompany.id,
        };
      }
      return {
        statusCompany: getStatusForCompany.access,
        roleUser: 'Sem função',
        codeEmployee: getStatus.codeEmployee,
        companyID: getStatusForCompany.id,
      };
    }
  }
}
