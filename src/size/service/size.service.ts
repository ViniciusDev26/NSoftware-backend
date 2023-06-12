import { Injectable } from '@nestjs/common';
import { sizeRepository } from 'src/database/repositories/prisma/size-prisma.repository';
import { createSizeDTO } from '../dtos/createSize.dtos';

@Injectable()
export class sizeService {
  constructor(readonly repository: sizeRepository) {}
  async save(body: Partial<createSizeDTO>) {
    const saveSize = await this.repository.save(body);
    return saveSize;
  }
}
