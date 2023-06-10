import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { companysPrismaRepository } from 'src/database/repositories/prisma/company-prisma.repository';
import { editCompanyDTO } from '../dtos/editCompany.dot';

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
export class companyService {
  constructor(private readonly Prisma: companysPrismaRepository) {}

  async create(params: companyProps) {
    const { access, codeEmployee, companyCode, companyName } = params;
    const validAccess = ['Básico', 'Premium', 'Prime'];
    if (!access || !codeEmployee || !companyCode || !companyName) {
      throw new HttpException('Error - Invalid params', HttpStatus.BAD_REQUEST);
    }

    const returnValisAccess = validAccess.find(
      (searchAccess) => access === searchAccess,
    );
    if (!returnValisAccess) {
      throw new HttpException('Error - Invalid params', HttpStatus.BAD_REQUEST);
    }

    const save = await this.Prisma.createCompany(params);
    return save;
  }

  async getCompany({ id }) {
    const receive = this.Prisma.receiveCompany(id);
    return receive;
  }

  async patchEnterprise(params: any) {
    if (!params.companyId) {
      throw new HttpException('Error - Invalid params', HttpStatus.BAD_REQUEST);
    }
    const path = this.Prisma.patchCompany(params);
    return path;
  }
}
