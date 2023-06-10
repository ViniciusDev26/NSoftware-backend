import { Injectable } from '@nestjs/common';
import { companysPrismaRepository } from 'src/database/repositories/prisma/company-prisma.repository';

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
      return { error: 'Invalid params' };
    }

    const returnValisAccess = validAccess.find(
      (searchAccess) => access === searchAccess,
    );
    if (!returnValisAccess) {
      return { Error: 'Invalid paramss' };
    }

    const save = await this.Prisma.createCompany(params);
    return save;
  }

  async getCompany({ codeEmployee }) {
    const codeFormated = parseInt(codeEmployee);
    const receive = this.Prisma.receiveCompany(codeFormated);
    return receive;
  }
}
