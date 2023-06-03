import { Injectable } from '@nestjs/common';
import { productPrismaRepository } from 'src/database/repositories/prisma/product-prisma.repository';

type datasForRegister = {
  companyId: number;
  image: string;
  name: string;
  recipeId: number;
  sizesId: number[];
  value: number;
  sizes: number;
};

@Injectable()
export class productService {
  constructor(readonly product: productPrismaRepository) {}
  async execute(companyId: number, page: number) {
    const allProducts = await this.product.getProducts(companyId, page);
    return allProducts;
  }

  async saveProduct(params: datasForRegister) {
    const { companyId, value, sizesId } = params;
    if (!companyId || !value || !sizesId) {
      return { error: 'Invalid params' };
    }
    const registerProducts = await this.product.registerProduct(params);
    return registerProducts;
  }
}
