import { Account } from 'src/shared/entities/Account';
import { CreateAccountRepository } from '../../interfaces/CreateAccountRepository';
import { PrismaService } from 'src/database/services/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';
import { PatchAccountRepository } from 'src/database/interfaces/patchAccountRepository';
import { DeleteAccountByIdRepository } from 'src/database/interfaces/DeleteAccountRepository';
import { getClientsRepository } from 'src/database/interfaces/getClientsRepository';
import { getAllClientsDTO } from 'src/account/dtos/getAllClients.dto';

@Injectable()
export class AccountPrismaRepository
  implements
    CreateAccountRepository,
    FindAccountByEmailRepository,
    PatchAccountRepository,
    DeleteAccountByIdRepository,
    getClientsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  private domainToPrismaData(account: Account) {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
      codeEmployee: account.codeEmployee,
      AddressId: account.AddressId,
      roleId: account.roleId,
      wage: account.wage,
      obs: account.obs,
      companyId: account.companyId,
    };
  }

  async save(account: Account): Promise<void> {
    const data = this.domainToPrismaData(account);
    const { codeEmployee } = account;
    if (codeEmployee) {
      const verifyCodeEmployee = await this.prismaService.companys.findFirst({
        where: {
          codeEmployee,
        },
      });
      if (verifyCodeEmployee) {
        await this.prismaService.account.create({
          data,
        });
        throw new HttpException('Success', HttpStatus.ACCEPTED);
      }

      throw new HttpException(
        'Error - Código não reconhecido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const create = await this.prismaService.account.create({
      data,
    });

    if (!create) {
      throw new HttpException(
        'Error - Não foi possível cadastrar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('Success', HttpStatus.ACCEPTED);
  }

  async findByMail(email: string): Promise<Account> {
    try {
      const accountData = await this.prismaService.account.findUnique({
        where: {
          email,
        },
      });
      return new Account(accountData);
    } catch {
      throw new HttpException(
        'Error - Não foi possível encontrar  usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async pathUser(account: Account) {
    const edition = await this.prismaService.account.update({
      where: {
        email: account.email,
      },
      data: {
        roleId: account.roleId,
        wage: account.wage,
      },
    });
    return edition;
  }

  async findById(email): Promise<any> {
    try {
      const deletionAccount = await this.prismaService.account.delete({
        where: {
          email: email.email,
        },
      });
      return deletionAccount;
    } catch {
      throw new HttpException(
        'Error - Não foi possível deletar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmpresaId(companyId: any): Promise<Account | void> {
    try {
      const clients = await this.prismaService.account.findMany({
        where: {
          companyId,
        },
      });
      clients.map((client) => {
        return new Account(client);
      });
    } catch {
      throw new HttpException(
        'Error - Clients não encontrados',
        HttpStatus.ACCEPTED,
      );
    }
  }
}
