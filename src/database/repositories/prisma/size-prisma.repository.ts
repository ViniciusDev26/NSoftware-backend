import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { createSizeDTO } from 'src/size/dtos/createSize.dtos';

@Injectable()
export class sizeRepository {
  constructor(readonly prisma: PrismaService) {}

  async save(params: any) {
    try {
      const saveSize = await this.prisma.sizes.create({
        data: params,
      });
      return saveSize;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async getAllProducts({ idProduct }) {
    try {
      const allProducts = await this.prisma.sizes.findMany({
        where: {
          productId: idProduct,
        },
      });
      return allProducts;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async deletion({ id }: { id: number }): Promise<void> {
    try {
      await this.prisma.sizes.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async change(datas: createSizeDTO) {
    try {
      await this.prisma.sizes.update({
        where: {
          id: datas.id,
        },
        data: {
          orderId: datas.orderId,
          productId: datas.productId,
          size: datas.size,
        },
      });
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
