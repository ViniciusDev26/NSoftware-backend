import { Order } from '@prisma/client';

export type orderProps = {
  id: number;
  companyId: number;
  userId: number;
  priority: boolean;
  status: string;
  date: Date;
  obs: string;
  value: number;
  size: string;
  page: number;
};

export interface OrderRepository {
  getOrders: (params: orderProps) => Promise<Order[]>;
}
