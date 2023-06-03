import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

type datasForRegister = {
  companyId: number;
  image: string;
  name: string;
  recipeId: number;
  sizes: number;
  value: number;
  sizesId: number[];
};

@Injectable()
export class productPrismaRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async getProducts(companyId: number, page: number) {
    const skip = 10 * (page - 1);
    const allProducts = await this.Prisma.products.findMany({
      skip,
      take: 10,
      where: {
        companyId,
      },
    });
    return allProducts;
  }

  async registerProduct(params: datasForRegister) {
    const saveProduct = await this.Prisma.products.create({
      data: {
        companyId: params.companyId,
        image: params.image,
        name: params.name,
        sizesId: params.sizes,
        value: params.value,
        recipeId: params.recipeId,
      },
    });
    return saveProduct;
  }
}
