import { Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/database/services/prisma.service';
type companyProps = {
  access: string;
  codeEmployee: number;
  companyCode: string;
  companyName: string;
};
@Injectable()
export class companysPrismaRepository {
  constructor(readonly prisma: PrismaService) {}
  async createCompany(data: companyProps) {
    const create = await this.prisma.companys.create({
      data,
    });
    return create;
  }

  async receiveCompany(codeEmployee: number) {
    try {
      const receive = await this.prisma.companys.findFirst({
        where: {
          codeEmployee,
        },
      });

      if (!receive) {
        return { status: 500, message: 'Internal Server Error' };
      } else {
        return { status: 200, message: 'OK' };
      }
    } catch (error) {
      return { status: 500, message: 'Internal Server Error' };
    }
  }
}
