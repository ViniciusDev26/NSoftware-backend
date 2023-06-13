import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { orderPrismaRepository } from 'src/database/repositories/prisma/order-prisma.repository';
import { GetOrdertDTO } from '../dtos/getOrder.dto';

@Injectable()
export class orderService {
  constructor(readonly register: orderPrismaRepository) {}

  async getOrders(params: Partial<GetOrdertDTO>) {
    const { userId, companyId } = params;
    if (!userId && !companyId) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
    const allOrders = await this.register.getOrders(params);
    return allOrders;
  }

  async makeOrder(params: Partial<GetOrdertDTO>) {
    const { companyId, userId, sizeId } = params;
    if (!companyId || !userId || !sizeId) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
    if (!params.priority) {
      params.priority = false;
    }
    const registed = await this.register.registerOrder(params);
    return registed;
  }

  async changeOrder(params: Partial<GetOrdertDTO>) {
    const { companyId, id, status } = params;
    const filterStatus = ['Preparando', 'Concluído', 'A caminho', 'Entregue'];
    console.log(params);
    if (status) {
      const conditionFIlter = filterStatus.find(
        (statusFilter) => statusFilter === status,
      );
      if (!conditionFIlter) {
        throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
      }
    }
    if (!companyId || !id) {
      throw new HttpException('Erroeer', HttpStatus.BAD_GATEWAY);
    }

    const service = await this.register.changeOnder(params);
    return service;
  }

  async deleteOrder(id) {
    if (!id) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }

    const deletion = await this.register.deletionOrder(id);
    return deletion;
  }
}
