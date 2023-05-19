import { Account } from 'src/account/entities/Account';
import { CreateAccountRepository } from '../../interfaces/CreateAccountRepository';
import { PrismaService } from 'src/database/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountPrismaRepository implements CreateAccountRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private domainToPrismaData(account: Account) {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
    };
  }

  async save(account: Account): Promise<void> {
    const data = this.domainToPrismaData(account);
    console.log(account);
    await this.prismaService.account.create({
      data,
    });
  }
}
