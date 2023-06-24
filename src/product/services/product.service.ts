import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/database/repositories/prisma/category-prisma.repository';
import { productPrismaRepository } from 'src/database/repositories/prisma/product-prisma.repository';
import { SizeRepository } from 'src/database/repositories/prisma/size-prisma.repository';
import { readFileSync } from 'fs';
import { UploadFiles3Provider } from 'src/AmazonS3/service/s3.service';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
type datasForRegister = {
  companyId: number;
  name: string;
  value: number;
  sizeName: string;
  categoryName: string;
  image: any;
};

interface GetWithIdParams {
  productId: number;
}

@Injectable()
export class productService {
  constructor(
    readonly product: productPrismaRepository,
    private readonly categoriesRepository: CategoryRepository,
    private readonly sizeRepository: SizeRepository,
    private readonly S3: UploadFiles3Provider,
  ) {}

  async execute(body: any) {
    const allProducts = await this.product.getProducts(body);
    return allProducts;
  }

  async saveProduct(params: datasForRegister) {
    const { companyId, value, sizeName, categoryName, image } = params;

    if (!companyId || !value || !sizeName || !categoryName || !image) {
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

    const s3 = await this.S3.upload(params.image);

    const paramsWithImage = {
      companyId: params.companyId,
      name: params.name,
      value: params.value,
      sizeName: params.sizeName,
      categoryName: params.categoryName,
      image: s3,
    };

    console.log(paramsWithImage);
    if (1 == 1) {
      return;
    }

    const registerProducts = await this.product.registerProduct(
      paramsWithImage,
    );

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
