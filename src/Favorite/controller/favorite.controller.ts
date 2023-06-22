import { Controller, Post, Query } from '@nestjs/common';
import { FavoriteDTO } from '../dtos/favorite.dto';
import { ServiceFavorite } from '../service/favorite.service';

@Controller('/favorite')
export class FavoriteController {
  constructor(readonly service: ServiceFavorite) {}

  @Post('/')
  async favorite(
    @Query('userId') userId: string,
    @Query('productId') productId: number,
  ) {
    const datas: FavoriteDTO = { userId, productId };
    const favorited = await this.service.save(datas);
    return favorited;
  }
}
