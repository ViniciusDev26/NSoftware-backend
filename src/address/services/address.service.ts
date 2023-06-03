import { Injectable } from '@nestjs/common';
import { addressPrismaRepository } from 'src/database/repositories/prisma/address.prisma.repository';

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
export class AddressService {
  constructor(readonly address: addressPrismaRepository) {}
  async register(params: addressProops) {
    const { idAccount } = params;
    if (!idAccount) {
      return { Error: 'Invalid params' };
    }
    const saveAddress = this.address.save(params);
    return saveAddress;
  }
}
