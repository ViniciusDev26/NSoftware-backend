import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Crypter } from 'src/shared/cryptography/protocols/crypter';
import { Account } from '../../shared/entities/Account';
import { CreateAccountRepository } from 'src/database/interfaces/CreateAccountRepository';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';
import { PatchAccountRepository } from 'src/database/interfaces/patchAccountRepository';
import { DeleteAccountByIdRepository } from 'src/database/interfaces/DeleteAccountRepository';
import { getClientsRepository } from 'src/database/interfaces/getClientsRepository';
import { getAllClientsDTO } from '../dtos/getAllClients.dto';

interface CreateAccountServiceParams {
  id?: string;
  name: string;
  email: string;
  password: string;
  companyId: number;
  addressId?: number;
  roleId?: number;
  wage?: number;
  obs?: string;
  codeEmployee?: number;
  orderId?: number;
}

@Injectable()
export class CreateAccountService {
  constructor(
    private readonly crypter: Crypter,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly findAccountByMail: FindAccountByEmailRepository,
    private readonly patch: PatchAccountRepository,
    private readonly deletion: DeleteAccountByIdRepository,
    private readonly getClients: getClientsRepository,
  ) {}

  async execute(params: CreateAccountServiceParams) {
    await this.findAccountByMail.findByMail(params.email);

    const hashPassword = await this.crypter.encrypt(params.password);
    const account = {
      name: params.name,
      email: params.email,
      password: hashPassword,
      companyId: params.companyId,
      codeEmployee: params.codeEmployee,
    };

    await this.createAccountRepository.save(account);
  }

  async editUser(param) {
    const edit = await this.patch.pathUser(param);
    return edit;
  }

  async deleteUser(email) {
    const deletionAccount = await this.deletion.findById(email);
    return deletionAccount;
  }

  async getAllClients(companyId: getAllClientsDTO) {
    if (!companyId) {
      throw new HttpException(
        'Error - Empresa não encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }
    const getClients = await this.getClients.findByEmpresaId(companyId);
    return getClients;
  }
}
