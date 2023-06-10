import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { orderPrismaRepository } from 'src/database/repositories/prisma/order-prisma.repository';

type orderPros = {
  companyId: number;
  userId: string;
  priority: boolean;
  status: string;
  date: Date;
  obs: string;
  value: number;
  size: string;
  id: number;
  page: number;
  lat?: string;
  lng?: string;
  name: string;
  image: string;
};

type getOrderParam = {
  companyId: number;
  userId?: string;
  page: number;
};
@Injectable()
export class orderService {
  constructor(readonly register: orderPrismaRepository) {}

  async getOrders(params: getOrderParam) {
    const { userId, companyId, page } = params;
    if ((!userId && !companyId) || !page) {
      throw new HttpException('Error', HttpStatus.BAD_GATEWAY);
    }
    const allOrders = await this.register.getOrders(params);
    return allOrders;
  }

  async makeOrder(params: orderPros) {
    const { companyId, userId, size, value } = params;
    if (!companyId || !userId || !size || !value) {
      return { Error: 'Invalid Params' };
    }
    if (!params.priority) {
      params.priority = false;
    }
    const registed = await this.register.registerOrder(params);
    return registed;
  }

  async changeOrder(params: orderPros) {
    const { companyId, id, status } = params;
    const filterStatus = ['Preparando', 'Concluído', 'A caminho', 'Entregue'];
    const conditionFIlter = filterStatus.find(
      (statusFilter) => statusFilter === status,
    );
    if (!conditionFIlter) {
      return { Error: 'Invalid Status' };
    }
    if (!companyId || !id) {
      return { Error: 'Invalid Params' };
    }
    const service = await this.register.changeOnder(params);
    return service;
  }
}
