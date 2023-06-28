import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressDTO } from 'src/address/dtos/adress.dto';
import { PrismaService } from 'src/database/services/prisma.service';
type addressProops = {
  id: string;
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

  async save(data: Partial<AddressDTO>) {
    const verifyAccount = await this.Prisma.address.findFirst({
      where: {
        AccountId: data.AccountId,
      },
    });
    if (verifyAccount) {
      throw new HttpException(
        'Endereço já sincronzado ',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const saveInBd = await this.Prisma.address.create({
        data: {
          AccountId: data.AccountId,
          district: data.district,
          houseNumber: data.houseNumber,
          lat: data.lat,
          lng: data.lng,
          street: data.street,
        },
      });
      await this.Prisma.account.update({
        where: {
          id: data.AccountId,
        },
        data: {
          addressId: saveInBd.id,
        },
      });
      return saveInBd;
    } catch (error) {
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
