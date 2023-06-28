import { Order } from '@prisma/client';

export type orderProps = {
  id: string;
  companyId: string;
  userId: string;
  priority: boolean;
  status: string;
  date: Date;
  obs: string;
  name: string;
  image: string;
  value: number;
  sizeId: string;
  page: number;
  lng?: string;
  lat?: string;
  productsId?: string;
  contact?: string;
};

export interface OrderRepository {
  getOrders: (params: orderProps) => Promise<Order[]>;
}
