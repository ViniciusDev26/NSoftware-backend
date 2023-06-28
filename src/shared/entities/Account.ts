interface AccountProperties {
  name: string;
  email: string;
  password: string;
  id?: string;
  companyId?: string;
  addressId?: string;
  orderId?: string;
  roleId?: string;
  wage?: number;
  obs?: string;
  codeEmployee?: number;
}

type Address = {
  id: string;
  lat: string;
  lng: string;
  street: string;
  houseNumber: number;
  district: string;
  obs?: string;
  Order?: Order;
  orderId?: string;
  Account: Account[];
};

type Product = {
  id: string;
  companyId: string;
  name: string;
  value: number;
  image: string;
  sizeId: string;
  recipeId?: string;
  RelationRequest: RelationRequest[];
};

type Order = {
  id: string;
  name: string;
  image: string;
  companyId: string;
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
  id: string;
  productId: string;
  quantity: number;
  orderId: string;
  order: Order;
  product: Product;
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
