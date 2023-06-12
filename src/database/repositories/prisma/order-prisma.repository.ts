import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  orderProps,
  OrderRepository,
} from 'src/database/interfaces/OrderRepository';
import { PrismaService } from 'src/database/services/prisma.service';
import { GetOrdertDTO } from 'src/order/dtos/getOrder.dto';

@Injectable()
export class orderPrismaRepository implements OrderRepository {
  constructor(readonly prisma: PrismaService) {}

  async registerOrder(params: Partial<GetOrdertDTO>) {
    console.log(params);

    try {
      const register = await this.prisma.order.create({
        data: {
          companyId: params.companyId,
          priority: params.priority || false,
          status: 'Novo',
          date: new Date(),
          obs: params.obs,
          userId: params.userId,
          productId: params.productId,
          sizeId: params.sizeId,
        },
      });
      return register;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async getOrders(params: Partial<orderProps>) {
    const { page } = params;
    const skip = (10 * (page - 1)) as number;

    if (params.userId as any) {
      const orders = await this.prisma.order.findMany({
        skip,
        take: 10,
        where: {
          userId: params.userId,
        },
      });
      return orders;
    }
    try {
      const orders: any = await this.prisma.order.findMany({
        skip,
        take: 15,
        where: {
          companyId: params.companyId,
        },
        include: {
          Products: true,
        },
      });
      return orders;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }

  async changeOnder(params: Partial<GetOrdertDTO>) {
    try {
      const change = await this.prisma.order.update({
        where: {
          id: params.id,
        },
        data: params,
      });
      return change;
    } catch {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
  }
}
