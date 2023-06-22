import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favorite.controller';
import { ServiceFavorite } from './service/favorite.service';

@Module({
  providers: [ServiceFavorite],
  controllers: [FavoriteController],
})
export class favoriteModule {}
