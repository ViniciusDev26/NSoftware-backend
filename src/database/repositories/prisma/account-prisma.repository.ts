import { Account } from 'src/shared/entities/Account';
import { CreateAccountRepository } from '../../interfaces/CreateAccountRepository';
import { PrismaService } from 'src/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
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
    await this.prismaService.account.create({
      data,
    });
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
}
