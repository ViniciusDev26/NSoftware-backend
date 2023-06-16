import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { companiesDTO } from '../dtos/companies.dto';
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
  async getProductForId(@Query('idProduct') idProduct: number) {
    const query: Partial<companiesDTO> = { idProduct };

    if (!query.idProduct) {
      throw new HttpException(
        'Erro - parametros inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const getProduct = await this.ProductService.getWithId(query);
    return getProduct;
  }

  @Post('/')
  async registerProduct(@Body() params: any) {
    const service = await this.ProductService.saveProduct(params);
    return service;
  }
}
