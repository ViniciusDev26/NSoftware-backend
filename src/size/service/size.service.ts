import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sizeRepository } from 'src/database/repositories/prisma/size-prisma.repository';
import { createSizeDTO } from '../dtos/createSize.dtos';

@Injectable()
export class sizeService {
  constructor(readonly repository: sizeRepository) {}
  async save(body: Partial<createSizeDTO>) {
    const saveSize = await this.repository.save(body);
    return saveSize;
  }

  async getsizes(idProduct) {
    if (!idProduct) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
    // const getAllProduct = await this.repository.getAllProducts(idProduct);
    return true;
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
