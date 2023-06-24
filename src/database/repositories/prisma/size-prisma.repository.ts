import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { createSizeDTO } from 'src/size/dtos/createSize.dtos';

interface GetSizesOrCreate {
  companyId: number;
  name: string;
}

@Injectable()
export class SizeRepository {
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

  async getAllProducts(companyId: number) {
    try {
      const allProducts = await this.prisma.sizes.findMany({
        where: {
          companyId,
        },
      });
      return allProducts;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async getSizesByNameOrCreate(params: GetSizesOrCreate) {
    let sizes = await this.prisma.sizes.findFirst({
      where: {
        companyId: params.companyId,
        name: params.name,
      },
    });

    if (!sizes) {
      sizes = await this.prisma.sizes.create({
        data: {
          companyId: params.companyId,
          name: params.name,
        },
      });
    }

    return sizes;
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
          name: datas.name,
        },
      });
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
