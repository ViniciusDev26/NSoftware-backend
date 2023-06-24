import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/database/repositories/prisma/category-prisma.repository';
import { CategoryDTO } from '../dto/category.dto';

@Injectable()
export class CategorySerivce {
  constructor(readonly prisma: CategoryRepository) {}
  async save(param: CategoryDTO) {
    if (!param.companyId || !param.category) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    const register = await this.prisma.save(param);
    return register;
  }

  async get(param: Partial<CategoryDTO>) {
    if (!param.companyId) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }

    const getAll = await this.prisma.getCategories(param);
    return getAll;
  }
}
