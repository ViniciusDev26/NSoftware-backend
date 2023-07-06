import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { orderPrismaRepository } from 'src/database/repositories/prisma/order-prisma.repository';
import { GetOrdertDTO } from '../dtos/getOrder.dto';

@Injectable()
export class orderService {
  constructor(readonly register: orderPrismaRepository) {}

  async getOrders(params: any) {
    const { companyId } = params;
    if (!companyId) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
    const allOrders = await this.register.getOrders(params);
    return allOrders;
  }

  async makeOrder(params) {
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

  async changeOrder(params) {
    const { companyId, id, status } = params;
    const filterStatus = [
      'Preparando',
      'Aguardando motoboy',
      'A caminho',
      'Entregue',
    ];
    if (status) {
      const conditionFIlter = filterStatus.find(
        (statusFilter) => statusFilter === status,
      );
      if (!conditionFIlter) {
        throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
      }
    }
    if (!companyId || !id) {
      throw new HttpException('Errosr', HttpStatus.BAD_GATEWAY);
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
