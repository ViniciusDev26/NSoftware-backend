import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CategorySerivce } from './service/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategorySerivce],
})
export class CategoryModule {}
