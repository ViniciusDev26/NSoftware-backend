import { Injectable } from '@nestjs/common';
import { productPrismaRepository } from 'src/database/repositories/prisma/product-prisma.repository';

type datasForRegister = {
  companyId: number;
  image: string;
  name: string;
  recipeId: number;
  value: number;
  sizeId: number;
};

@Injectable()
export class productService {
  constructor(readonly product: productPrismaRepository) {}
  async execute(body: any) {
    const allProducts = await this.product.getProducts(body);
    return allProducts;
  }

  async saveProduct(params: datasForRegister) {
    const { companyId, value, sizeId } = params;
    if (!companyId || !value || !sizeId) {
      return { error: 'Invalid params' };
    }
    const registerProducts = await this.product.registerProduct(params);
    return registerProducts;
  }
}
