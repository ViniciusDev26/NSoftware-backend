import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFiles3Provider } from 'src/AmazonS3/service/s3.service';
import { productController } from './controllers/product.controller';
import { productService } from './services/product.service';

@Module({
  controllers: [productController],
  providers: [productService, UploadFiles3Provider],
  imports: [
    MulterModule.register({
      dest: './uploads', // Pasta onde os arquivos serão armazenados
    }),
  ],
})
export class productModule {}
