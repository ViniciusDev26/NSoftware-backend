import { Account } from 'src/shared/entities/Account';
import { CreateAccountRepository } from '../../interfaces/CreateAccountRepository';
import { PrismaService } from 'src/database/services/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';

@Injectable()
export class AccountPrismaRepository
  implements CreateAccountRepository, FindAccountByEmailRepository
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
      role: account.role,
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
    const accountData = await this.prismaService.account.findUnique({
      where: {
        email,
      },
    });

    if (!accountData) return null;
    return new Account(accountData);
  }

  async login(params) {
    const handleLogin = await this.prismaService.account.findFirst({
      where: {
        email: params.email,
        password: params.password,
      },
    });
  }
}
