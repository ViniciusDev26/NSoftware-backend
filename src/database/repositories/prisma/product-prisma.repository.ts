import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
// import { companiesDTO } from 'src/product/dtos/CreateProduct.dto';

type datasForRegister = {
  companyId: string;
  image: any;
  name: string;
  sizeName: string;
  value: number;
  onlyCombo: boolean;
};

interface LinkWithCategoriesParams {
  productId: string;
  categoriesId: string | string[];
}
interface LinkWithSizesParams {
  productId: string;
  sizeInformateId: string | string[];
}

interface GetWithIdParams {
  idProduct: string;
}

type listCombosProps = {
  page: number;
  companyId: string;
};

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
          ProductsBySizes: {
            include: {
              Size: true,
            },
          },
          productsByCategory: {
            include: {
              Category: true,
            },
          },
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
          onlyCombo: params.onlyCombo,
        },
      });
      return saveProduct;
    } catch (error) {
      console.log(error);
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
  async verifyProductById(id) {
    const verify = await this.Prisma.products.findUnique({
      where: {
        id,
      },
    });
    return verify;
  }
  async verifyProductExist(name: string) {
    const verify = await this.Prisma.products.findFirst({
      where: {
        name,
      },
    });
    if (verify) {
      throw new HttpException(
        'Erro - Produto já cadastrado ',
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.Prisma.products.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro - Produto não encontrado ',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async registerCombo(param) {
    console.log(param);
    await this.Prisma.combo.create({
      data: {
        name: param.name,
        Image: param.image,
        price: param.price,
        companyId: param.companyId,

        productsByCombo: {
          create: param.productsId.map((productId) => ({
            productId,
            companyId: param.companyId,
          })),
        },
      },
    });
  }
  async listCombos(params: listCombosProps) {
    const skip = 10 * (params.page - 1);
    const list = await this.Prisma.combo.findMany({
      skip,
      take: 10,
      where: {
        companyId: params.companyId,
      },
      include: {
        productsByCombo: true,
      },
    });
    return list;
  }
}
