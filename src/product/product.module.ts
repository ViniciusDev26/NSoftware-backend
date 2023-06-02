import { Module } from '@nestjs/common';
import { productController } from './controllers/product.controller';
import { productService } from './services/product.service';

@Module({
  controllers: [productController],
  providers: [productService],
})
export class productModule {}
