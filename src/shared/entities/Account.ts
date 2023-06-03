interface AccountProperties {
  id?: string;
  name: string;
  email: string;
  password: string;
  companyId: number;
  AddressId?: number;
  role?: string;
  wage?: number;
  obs?: string;
  codeEmployee?: number;
}

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

  get role() {
    return this.properties.role;
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

  get AddressId() {
    return this.properties.AddressId;
  }
}
