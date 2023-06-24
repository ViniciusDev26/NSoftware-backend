interface AccountProperties {
  name: string;
  email: string;
  password: string;
  id?: string;
  companyId?: number;
  addressId?: number;
  orderId?: number;
  roleId?: number;
  wage?: number;
  obs?: string;
  codeEmployee?: number;
}
type Company = {
  id: number;
  companyCode: string;
  codeEmployee: number;
  companyName: string;
  access: string;
  lat: string;
  lng: string;
  street: string;
  houseNumber: number;
  district: string;
};

type Address = {
  id: number;
  lat: string;
  lng: string;
  street: string;
  houseNumber: number;
  district: string;
  obs?: string;
  Order?: Order;
  orderId?: number;
  Account: Account[];
};

type Role = {
  id: number;
  companyId: number;
  role: string;
};

type Product = {
  id: number;
  companyId: number;
  name: string;
  value: number;
  image: string;
  sizeId: number;
  recipeId?: number;
  RelationRequest: RelationRequest[];
};

type Size = {
  id: number;
  size: string;
  productId: number;
};

type Order = {
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
  Account: Account[];
  address: Address[];
  RelationRequest: RelationRequest[];
};

type RelationRequest = {
  id: number;
  productId: number;
  quantity: number;
  orderId: number;
  order: Order;
  product: Product;
};

type Stock = {
  id: number;
  companyId: number;
  name: string;
  unidade: string;
  unitPrice: number;
  quantity: number;
};

export class Account {
  private properties: AccountProperties;

  constructor(params: AccountProperties) {
    this.properties = params;
  }

  get id() {
    return this.properties.id;
  }

  get name() {
    return this.properties.name;
  }

  get email() {
    return this.properties.email;
  }

  get password() {
    return this.properties.password;
  }

  get companyId() {
    return this.properties.companyId;
  }

  get roleId() {
    return this.properties.roleId;
  }

  get wage() {
    return this.properties.wage;
  }

  get obs() {
    return this.properties.obs;
  }

  get codeEmployee() {
    return this.properties.codeEmployee;
  }

  get addressId() {
    return this.properties.addressId;
  }
}
