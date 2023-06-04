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
  id: number;
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

  async change(params: addressProops) {
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
  }
}
