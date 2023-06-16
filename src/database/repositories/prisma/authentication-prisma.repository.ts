import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class authorizationRepository {
  constructor(readonly prisma: PrismaService) {}
  async getStausByCompany(email) {
    try {
      const getStatus = await this.prisma.account.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          companyId: true,
          email: true,
          Company: {
            select: {
              id: true,
              access: true,
              district: true,
              lat: true,
              lng: true,
              houseNumber: true,
              street: true,
            },
          },
          role: {
            select: {
              role: true,
            },
          },
          address: true,
        },
      });

      return getStatus;
    } catch {
      throw new HttpException('Error ', HttpStatus.BAD_REQUEST);
    }
  }
}
