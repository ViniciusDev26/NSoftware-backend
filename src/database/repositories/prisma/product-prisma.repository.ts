import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { companiesDTO } from 'src/product/dtos/companies.dto';

type datasForRegister = {
  companyId: number;
  image: string;
  name: string;
  recipeId: number;
  sizeId: number;
  value: number;
};

@Injectable()
export class productPrismaRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async getProducts(body: any) {
    const skip = 10 * (body.page - 1);
    try {
      const allProducts = await this.Prisma.products.findMany({
        skip,
        take: 10,
        where: {
          companyId: body.companyID,
        },
        include: {
          Sizes: true,
        },
      });
      return allProducts;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async registerProduct(params: datasForRegister) {
    try {
      const saveProduct = await this.Prisma.products.create({
        data: {
          companyId: params.companyId,
          sizeId: params.sizeId,
          image: params.image,
          name: params.name,
          value: params.value,
          recipeId: params.recipeId,
        },
      });
      return saveProduct;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async getWithId(query: Partial<companiesDTO>) {
    const { idProduct } = query;

    try {
      const getItem = await this.Prisma.products.findUnique({
        where: {
          id: idProduct,
        },
        include: {
          Sizes: true,
        },
      });
      return getItem;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }
}
