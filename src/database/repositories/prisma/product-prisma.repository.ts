import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

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

  async getProducts(companyId: number, page: number) {
    const skip = 10 * (page - 1);
    try {
      const allProducts = await this.Prisma.products.findMany({
        skip,
        take: 10,
        where: {
          companyId,
        },
      });
      return allProducts;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async registerProduct(params: datasForRegister) {
    console.log(params);

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
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }
}
