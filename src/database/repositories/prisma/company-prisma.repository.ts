import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

type companyProps = {
  access: string;
  codeEmployee: number;
  companyCode: string;
  companyName: string;
  lat: string;
  lng: string;
  street: string;
  houseNumber: number;
  district: string;
};
@Injectable()
export class companysPrismaRepository {
  constructor(readonly prisma: PrismaService) {}
  async createCompany(data: companyProps) {
    try {
      const create = await this.prisma.companys.create({
        data,
      });
      return create;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async receiveCompany(id: number) {
    try {
      const receive = await this.prisma.companys.findFirst({
        where: {
          id,
        },
      });
      return receive;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async patchCompany(data) {
    try {
      const edit = await this.prisma.companys.update({
        where: {
          id: data.companyId,
        },
        data: {
          lat: data.lat,
          lng: data.lng,
          access: data.access,
          district: data.district,
          street: data.street,
          houseNumber: data.houseNumber,
          companyName: data.companyName,
        },
      });
      return edit;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
