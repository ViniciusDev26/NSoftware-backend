import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class sizeRepository {
  constructor(readonly prisma: PrismaService) {}

  async save(params) {
    console.log(params);
    try {
      const saveSize = await this.prisma.sizes.create({
        data: params,
      });
      return saveSize;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }
}
