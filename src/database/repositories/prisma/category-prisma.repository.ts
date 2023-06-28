import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDTO } from 'src/Category/dto/category.dto';
import { PrismaService } from 'src/database/services/prisma.service';

interface GetCategoryOrCreate {
  companyId: string;
  name: string;
}

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(data: CategoryDTO) {
    try {
      const saveCategory = await this.prisma.category.create({
        data: {
          name: data.category,
          companyId: data.companyId,
        },
      });
      return saveCategory;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async getCategoryByNameOrCreate(params: GetCategoryOrCreate) {
    let category = await this.prisma.category.findFirst({
      where: {
        companyId: params.companyId,
        name: params.name,
      },
    });

    if (!category) {
      category = await this.prisma.category.create({
        data: {
          companyId: params.companyId,
          name: params.name,
        },
      });
    }

    return category;
  }

  async getCategories(data: Partial<CategoryDTO>) {
    try {
      const categories = await this.prisma.category.findMany({
        where: {
          companyId: data.companyId,
        },
      });

      return categories;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
