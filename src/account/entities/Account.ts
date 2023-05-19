interface AccountProperties {
  id?: string;
  name: string;
  email: string;
  password: string;
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
}
