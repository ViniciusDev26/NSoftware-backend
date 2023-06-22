import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritePrismaRepository } from 'src/database/repositories/prisma/favorite-prisma.repository';
import { FavoriteDTO } from '../dtos/favorite.dto';

@Injectable()
export class ServiceFavorite {
  constructor(readonly prisma: FavoritePrismaRepository) {}
  async save(query: FavoriteDTO) {
    if (!query.productId) {
      throw new HttpException('Error - Invalid params', HttpStatus.BAD_REQUEST);
    }

    const saveInBd = await this.prisma.saveFavorite(query);
    return saveInBd;
  }
}
