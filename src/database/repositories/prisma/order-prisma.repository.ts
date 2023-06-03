import { Injectable } from '@nestjs/common';
import {
  orderProps,
  OrderRepository,
} from 'src/database/interfaces/OrderRepository';
import { PrismaService } from 'src/database/services/prisma.service';

@Injectable()
export class orderPrismaRepository implements OrderRepository {
  constructor(readonly prisma: PrismaService) {}

  async registerOrder(params: orderProps) {
    const { companyId, priority, size, userId, value, obs, lat, lng } = params;
    try {
      const register = await this.prisma.order.create({
        data: {
          userId,
          companyId,
          date: new Date(),
          priority,
          size,
          status: 'Novo',
          value,
          obs,
          lat,
          lng,
        },
      });
      return register;
    } catch (err) {
      return err;
    }
  }

  async getOrders(params: orderProps) {
    const { page } = params;
    const skip = 10 * (page - 1);
    if (params.userId) {
      const orders = await this.prisma.order.findMany({
        skip,
        take: 10,
        where: {
          userId: params.userId,
        },
      });
      return orders;
    }
    const orders = await this.prisma.order.findMany({
      skip,
      take: 15,
      where: {
        companyId: params.companyId,
      },
    });
    return orders;
  }

  async changeOnder(params: orderProps) {
    const change = await this.prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        status: params.status,
      },
    });
    return change;
  }
}
