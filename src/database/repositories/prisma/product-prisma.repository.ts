import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
// import { companiesDTO } from 'src/product/dtos/CreateProduct.dto';

type datasForRegister = {
  companyId: number;
  image: any;
  name: string;
  sizeName: string;
  value: number;
};

interface LinkWithCategoriesParams {
  productId: number;
  categoriesId: number | number[];
}
interface LinkWithSizesParams {
  productId: number;
  sizeInformateId: number | number[];
}

interface GetWithIdParams {
  idProduct: number;
}

@Injectable()
export class productPrismaRepository {
  constructor(private readonly Prisma: PrismaService) {}

  async getProducts(body: any) {
    const skip = 10 * (body.page - 1);
    try {
      const allProducts = await this.Prisma.products.findMany({
        skip,
        take: 10,
        where: {
          companyId: body.companyID,
        },
        include: {
          ProductsBySizes: true,
        },
      });
      return allProducts;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async registerProduct(params: datasForRegister) {
    try {
      const saveProduct = await this.Prisma.products.create({
        data: {
          companyId: params.companyId,
          image: params.image,
          name: params.name,
          value: params.value,
        },
      });
      return saveProduct;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async linkWithCategories(params: LinkWithCategoriesParams) {
    const categories = Array.isArray(params.categoriesId)
      ? params.categoriesId
      : [params.categoriesId];

    for (const categoryId of categories) {
      await this.Prisma.products.update({
        data: {
          productsByCategory: {
            create: {
              categoryId: categoryId,
            },
          },
        },
        where: {
          id: params.productId,
        },
      });
    }
  }
  async linkWithSizes(params: LinkWithSizesParams) {
    const sizes = Array.isArray(params.sizeInformateId)
      ? params.sizeInformateId
      : [params.sizeInformateId];

    for (const sizeIdOf of sizes) {
      await this.Prisma.products.update({
        data: {
          ProductsBySizes: {
            create: {
              sizeId: sizeIdOf,
            },
          },
        },
        where: {
          id: params.productId,
        },
      });
    }
  }

  async getWithId(params: GetWithIdParams) {
    const { idProduct } = params;

    try {
      const getItem = await this.Prisma.products.findUnique({
        where: {
          id: idProduct,
        },
        include: {
          ProductsBySizes: true,
        },
      });
      return getItem;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }
}
