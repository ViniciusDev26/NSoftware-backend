import { Injectable } from '@nestjs/common';
import { addressPrismaRepository } from 'src/database/repositories/prisma/address.prisma.repository';

type uploadAddressProops = {
  id: string;
  lat: string;
  lng: string;
  AccountId: string;
  street: string;
  houseNumber: number;
  district: string;
  obs?: string;
};

type addressProops = {
  lat: string;
  lng: string;
  AccountId: string;
  street: string;
  houseNumber: number;
  district: string;
  obs?: string;
};

@Injectable()
export class AddressService {
  constructor(readonly address: addressPrismaRepository) {}

  async register(params: addressProops) {
    const { AccountId } = params;
    if (!AccountId) {
      return { Error: 'Invalid params' };
    }

    const saveAddress = this.address.save(params);
    return saveAddress;
  }

  async change(params: uploadAddressProops) {
    const { AccountId, id } = params;
    if (!AccountId || !id) {
      return { Error: 'Invalid params' };
    }
    const changeAddress = this.address.change(params);
    return changeAddress;
  }
}
