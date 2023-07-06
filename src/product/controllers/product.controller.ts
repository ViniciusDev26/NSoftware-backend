import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCombroDTO } from '../dtos/CreateCombo.dto';
import { CreateProductDTO } from '../dtos/CreateProduct.dto';
import { deleteProductDTO } from '../dtos/deleteProduct';
import { GetProductById } from '../dtos/GetProductById.dto';
import { ListComboDTO } from '../dtos/ListCombo.dto';
import { productService } from '../services/product.service';

@Controller('/product')
export class productController {
  constructor(private readonly ProductService: productService) {}

  @Get('/')
  async getProduct(
    @Query('companyId') companyId: string,
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

    const products = await this.ProductService.execute(body);

    return products.map((product) => {
      return {
        ...product,
        url: `http://localhost:3000/s3?key=${product.image}`,
      };
    });
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
      price: params.price,
      onlyCombo: params.onlyCombo,
    };
    const service = await this.ProductService.saveProduct(data);
    return service;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: deleteProductDTO) {
    const deletion = await this.ProductService.deleteProduct(id);
    return deletion;
  }

  @Post('/combo')
  @UseInterceptors(FileInterceptor('image'))
  async uploadCombo(
    @Body() params: CreateCombroDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = {
      name: params.name,
      price: params.price,
      image: file,
      productsId: params.productsId,
      companyId: params.companyId,
      description: params.description,
    };
    const register = await this.ProductService.updateCombo(data);
    return register;
  }

  @Get('/combo')
  async lisCombos(@Query() params: ListComboDTO) {
    const List = await this.ProductService.ListCombo(params);
    return List.map((product) => {
      return {
        ...product,
        url: `http://localhost:3000/s3?key=${product.Image}`,
      };
    });
  }
}
