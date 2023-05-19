import { Injectable } from '@nestjs/common';
import { Crypter } from 'src/shared/cryptography/protocols/crypter';
import { Account } from '../entities/Account';
import { CreateAccountRepository } from 'src/database/interfaces/CreateAccountRepository';

interface CreateAccountServiceParams {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateAccountService {
  constructor(
    private readonly crypter: Crypter,
    private readonly createAccountRepository: CreateAccountRepository,
  ) {}

  async execute(params: CreateAccountServiceParams) {
    const hashPassword = await this.crypter.encrypt(params.password);

    const account = new Account({
      name: params.name,
      email: params.email,
      password: hashPassword,
    });

    await this.createAccountRepository.save(account);
  }
}
