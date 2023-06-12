import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
type addressProops = {
  id: number;
  AccountId: string;
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

  async save(data: any) {
    try {
      const saveInBd = await this.Prisma.address.create({
        data,
      });
      return saveInBd;
    } catch {
      throw new HttpException('Error ', HttpStatus.BAD_REQUEST);
    }
  }

  async change(params: addressProops) {
    try {
      const changeAddress = await this.Prisma.address.update({
        where: {
          id: params.id,
        },
        data: {
          lat: params.lat,
          lng: params.lng,
          district: params.district,
          houseNumber: params.houseNumber,
          obs: params.obs,
          street: params.street,
        },
      });
      return changeAddress;
    } catch {
      throw new HttpException('Error ', HttpStatus.BAD_REQUEST);
    }
  }
}
