import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/database/repositories/prisma/category-prisma.repository';
import { productPrismaRepository } from 'src/database/repositories/prisma/product-prisma.repository';
import { sizeRepository } from 'src/database/repositories/prisma/size-prisma.repository';

type datasForRegister = {
  companyId: number;
  image: string;
  name: string;
  value: number;
  sizeName: string;
  categoryName: string;
};

interface GetWithIdParams {
  productId: number;
}

@Injectable()
export class productService {
  constructor(
    readonly product: productPrismaRepository,
    private readonly categoriesRepository: CategoryRepository,
    private readonly sizeRepository: sizeRepository,
  ) {}

  async execute(body: any) {
    const allProducts = await this.product.getProducts(body);
    return allProducts;
  }

  async saveProduct(params: datasForRegister) {
    const { companyId, value, sizeName, categoryName } = params;
    if (!companyId || !value || !sizeName) {
      throw new HttpException(
        'Erro - parametros inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const category = await this.categoriesRepository.getCategoryByNameOrCreate({
      companyId,
      name: categoryName,
    });

    const size = await this.sizeRepository.getSizesByNameOrCreate({
      companyId,
      name: sizeName,
    });

    const registerProducts = await this.product.registerProduct(params);

    await this.product.linkWithCategories({
      productId: registerProducts.id,
      categoriesId: category.id,
    });

    await this.product.linkWithSizes({
      productId: registerProducts.id,
      sizeInformateId: size.id,
    });
    return registerProducts;
  }

  async getWithId(query: GetWithIdParams) {
    const get = await this.product.getWithId({
      idProduct: query.productId,
    });

    return get;
  }
}
