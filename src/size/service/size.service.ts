import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SizeRepository } from 'src/database/repositories/prisma/size-prisma.repository';
import { createSizeDTO } from '../dtos/createSize.dtos';

@Injectable()
export class sizeService {
  constructor(readonly repository: SizeRepository) {}
  async save(body: Partial<createSizeDTO>) {
    const saveSize = await this.repository.save(body);
    return saveSize;
  }

  async getsizes(companyId: string) {
    if (!companyId) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
    const getAllSizes = await this.repository.getAllProducts(companyId);
    return getAllSizes;
  }

  async deleteSize(id: any) {
    if (!id) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    const deleteSizes = await this.repository.deletion(id);
    return deleteSizes;
  }

  async patchSize(datas: createSizeDTO) {
    const changeSize = await this.repository.change(datas);
    return changeSize;
  }
}
