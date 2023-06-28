import { Controller, Get, Query, Response } from '@nestjs/common';
import { Readable } from 'stream';
import { ReturnImageDTO } from '../dto/returnImage.DTO';
import { ReturnImage } from '../service/ReturnImage.service';

@Controller('/s3')
export class S3Controller {
  constructor(private readonly service: ReturnImage) {}
  @Get('/')
  async getImage(@Query() param: ReturnImageDTO, @Response() response: any) {
    const buffer = await this.service.returnImage(param.key);
    const stream = Readable.from(buffer);
    stream.pipe(response);
  }
}
