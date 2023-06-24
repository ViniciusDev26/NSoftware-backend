import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { FavoriteDTO } from 'src/Favorite/dtos/favorite.dto';

@Injectable()
export class FavoritePrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveFavorite(data: FavoriteDTO) {
    try {
      const save = await this.prisma.favorites.create({
        data: {
          productId: data.productId,
          accountId: data.userId,
        },
      });
      return save;
    } catch (error) {
      throw new HttpException('Error - Invalid params', HttpStatus.BAD_REQUEST);
    }
  }
}
