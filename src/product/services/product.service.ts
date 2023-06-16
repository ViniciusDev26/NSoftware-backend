import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        'Erro - parametros inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const registerProducts = await this.product.registerProduct(params);
    return registerProducts;
  }

  async getWithId(query) {
    const get = await this.product.getWithId(query);
    return get;
  }
}
