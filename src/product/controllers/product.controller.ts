import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { productService } from '../services/product.service';

@Controller('/product')
export class productController {
  constructor(private readonly ProductService: productService) {}

  @Get('/')
  async getProduct(@Query() query): Promise<any> {
    const { companyID } = query;
    if (!companyID) {
      return { Error: 'Favor informar companyID' };
    }
    const idTransform = parseInt(companyID);
    const service = await this.ProductService.execute(idTransform);
    return service;
  }

  @Post('/')
  async registerProduct(@Body() params: any) {
    const service = await this.ProductService.saveProduct(params);
    return service;
  }
}
