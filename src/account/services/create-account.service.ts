import { Injectable } from '@nestjs/common';
import { Crypter } from 'src/shared/cryptography/protocols/crypter';
import { Account } from '../../shared/entities/Account';
import { CreateAccountRepository } from 'src/database/interfaces/CreateAccountRepository';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';
import { EmailAlreadyUsedException } from '../exceptions/email-already-used.exception';

interface CreateAccountServiceParams {
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

@Injectable()
export class CreateAccountService {
  constructor(
    private readonly crypter: Crypter,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly findAccountByMail: FindAccountByEmailRepository,
  ) {}

  async execute(params: CreateAccountServiceParams) {
    const alreadyExists = await this.findAccountByMail.findByMail(params.email);
    if (alreadyExists) {
      throw new EmailAlreadyUsedException();
    }

    const hashPassword = await this.crypter.encrypt(params.password);
    const account = new Account({
      name: params.name,
      email: params.email,
      password: hashPassword,
      companyId: params.companyId,
      AddressId: params.AddressId,
      codeEmployee: params.codeEmployee,
      wage: params.wage,
      obs: params.obs,
      role: params.obs,
    });

    await this.createAccountRepository.save(account);
  }
}
