import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

type datasForRegister = {
  companyId: number;
  image: string;
  name: string;
  recipeId: number;
  sizes: number[];
  value: number;
};

@Injectable()
export class productPrismaRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async getProducts(companyId) {
    const allProducts = await this.Prisma.products.findMany({
      where: {
        companyId,
      },
    });

    return allProducts;
  }

  async registerProduct(params) {
    console.log(params);
    const saveProduct = await this.Prisma.products.create({
      data: params,
    });
    return saveProduct;
  }
}
