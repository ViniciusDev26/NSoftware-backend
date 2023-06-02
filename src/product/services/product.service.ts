import { Injectable } from '@nestjs/common';
import { productPrismaRepository } from 'src/database/repositories/prisma/product-prisma.repository';
@Injectable()
export class productService {
  constructor(readonly product: productPrismaRepository) {}
  async execute(companyId) {
    const allProducts = await this.product.getProducts(companyId);
    return allProducts;
  }

  async saveProduct(params) {
    const registerProducts = await this.product.registerProduct(params);
    return registerProducts;
  }
}
