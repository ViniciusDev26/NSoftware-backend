import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/database/repositories/prisma/category-prisma.repository';
import { productPrismaRepository } from 'src/database/repositories/prisma/product-prisma.repository';
import { SizeRepository } from 'src/database/repositories/prisma/size-prisma.repository';
import { UploadFiles3Provider } from 'src/AmazonS3/service/s3.service';
import { CreateCombroDTO } from '../dtos/CreateCombo.dto';
type datasForRegister = {
  companyId: string;
  name: string;
  value: number;
  sizeName: string;
  categoryName: string;
  image: any;
  onlyCombo: boolean;
};

interface GetWithIdParams {
  productId: string;
}

type registerComboProps = {
  companyId: string;
  image: any;
  productsId: string;
  name: string;
  price: number;
  description: string;
};

type ListComboProps = {
  page: number;
  companyId: string;
};

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
    const { companyId, value, sizeName, categoryName, image, name } = params;

    if (!companyId || !value || !sizeName || !categoryName || !image || !name) {
      console.log(companyId, value, sizeName, categoryName, image);
      throw new HttpException(
        'Erro - parametros inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.product.verifyProductExist(name);

    const categories = [];
    for (const categoryItem of categoryName) {
      const category =
        await this.categoriesRepository.getCategoryByNameOrCreate({
          companyId,
          name: categoryItem,
        });
      categories.push(category);
    }

    const sizies = [];

    for (const sizeItem of sizeName) {
      const size = await this.sizeRepository.getSizesByNameOrCreate({
        companyId,
        name: sizeItem,
      });
      sizies.push(size);
    }

    const s3 = await this.S3.upload(params.image);

    const paramsWithImage = {
      companyId: params.companyId,
      name: params.name,
      value: params.value,
      sizeName: params.sizeName,
      categoryName: params.categoryName,
      onlyCombo: params.onlyCombo,
      image: s3.key,
    };

    const registerProducts = await this.product.registerProduct(
      paramsWithImage,
    );

    await this.product.linkWithCategories({
      productId: registerProducts.id,
      categoriesId: categories.map((category) => category.id),
    });

    await this.product.linkWithSizes({
      productId: registerProducts.id,
      sizeInformateId: sizies.map((size) => size.id),
    });
    return registerProducts;
  }

  async getWithId(query: GetWithIdParams) {
    const get = await this.product.getWithId({
      idProduct: query.productId,
    });

    return get;
  }

  async deleteProduct(id) {
    if (!id) {
      throw new HttpException(
        'Erro - Id não informado',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deletion = await this.product.deleteProduct(id);
    return deletion;
  }

  async updateCombo(param: registerComboProps) {
    console.log(param);
    for (const id of param.productsId) {
      const verifyProductExist = await this.product.verifyProductById(id);
      if (!verifyProductExist) {
        throw new HttpException(
          'Erro - Produto não encontrado ',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const s3 = await this.S3.upload(param.image);
    const data = {
      name: param.name,
      price: param.price,
      image: s3.key,
      productsId: param.productsId,
      description: param.description,
      companyId: param.companyId,
    };
    await this.product.registerCombo(data);
  }
  async ListCombo(params: ListComboProps) {
    if (!params.companyId) {
      throw new HttpException(
        'Erro - CompanyId não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    const list = await this.product.listCombos(params);
    return list;
  }
}
