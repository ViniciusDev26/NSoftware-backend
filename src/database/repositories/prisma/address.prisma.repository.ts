import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
type addressProops = {
  idAccount: number;
  lat: string;
  lng: string;
  street: string;
  houseNumber: number;
  district: string;
  obs?: string;
};

@Injectable()
export class addressPrismaRepository {
  constructor(private readonly Prisma: PrismaService) {}
  async save(data: addressProops) {
    const saveInBd = await this.Prisma.address.create({
      data,
    });
    return saveInBd;
  }
}
