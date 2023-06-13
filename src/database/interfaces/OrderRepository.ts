import { Order } from '@prisma/client';

export type orderProps = {
  id: number;
  companyId: number;
  userId: string;
  priority: boolean;
  status: string;
  date: Date;
  obs: string;
  name: string;
  image: string;
  value: number;
  sizeId: number;
  page: number;
  lng?: string;
  lat?: string;
  productsId?: number;
  contact?: string;
};

export interface OrderRepository {
  getOrders: (params: orderProps) => Promise<Order[]>;
}
