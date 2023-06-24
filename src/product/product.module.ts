import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { productController } from './controllers/product.controller';
import { productService } from './services/product.service';

@Module({
  controllers: [productController],
  providers: [productService],
  imports: [
    MulterModule.register({
      dest: './uploads', // Pasta onde os arquivos serão armazenados
    }),
  ],
})
export class productModule {}
