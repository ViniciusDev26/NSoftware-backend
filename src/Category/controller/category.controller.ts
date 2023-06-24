import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryDTO } from '../dto/category.dto';
import { CategorySerivce } from '../service/category.service';

@Controller('/categories')
export class CategoryController {
  constructor(readonly service: CategorySerivce) {}

  @Post('/')
  async saveCategories(
    @Body('category') category: string,
    @Body('companyId') companyId: number,
  ) {
    const data: CategoryDTO = {
      category,
      companyId,
    };
    console.log(data);

    const returnService = await this.service.save(data);
    return returnService;
  }

  @Get('/')
  async getCategories(@Query('companyId') companyId: number) {
    const data: Partial<CategoryDTO> = { companyId };
    const returnService = await this.service.get(data);
    return returnService;
  }
}