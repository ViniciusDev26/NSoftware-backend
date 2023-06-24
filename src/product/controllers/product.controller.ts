import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDTO } from '../dtos/CreateProduct.dto';
import { GetProductById } from '../dtos/GetProductById.dto';
import { productService } from '../services/product.service';

@Controller('/product')
export class productController {
  constructor(private readonly ProductService: productService) {}

  @Get('/')
  async getProduct(
    @Query('companyId') companyId: number,
    @Query('page') page: number,
  ) {
    const body = {
      companyId,
      page,
    };
    if (!body.companyId || !body.page) {
      throw new HttpException(
        'Erro - parametros inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const service = await this.ProductService.execute(body);
    return service;
  }

  @Get('/id')
  async getProductForId(@Query('idProduct') params: GetProductById) {
    if (!params.productId) {
      throw new HttpException(
        'Erro - parametros inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const getProduct = await this.ProductService.getWithId(params);
    return getProduct;
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async registerProduct(
    @Body() params: CreateProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = {
      categoryName: params.categoryName,
      companyId: params.companyId,
      image: file,
      name: params.name,
      sizeName: params.sizeName,
      value: params.value,
    };
    const service = await this.ProductService.saveProduct(data);
    return service;
  }
}
