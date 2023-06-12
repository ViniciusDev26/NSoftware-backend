export type Order = {
  id: number;
  name: string;
  image: string;
  companyId: number;
  priority: boolean;
  status: string;
  date: Date;
  obs?: string;
  value: number;
  size: string;
  lat?: string;
  lng?: string;
  userId: string;
  account: string;
  address: string[];
  relationRequest: string[];
};
