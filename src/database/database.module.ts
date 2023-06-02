import { Global, Module } from '@nestjs/common';
import { AccountPrismaRepository } from './repositories/prisma/account-prisma.repository';
import { CreateAccountRepository } from './interfaces/CreateAccountRepository';
import { PrismaService } from './services/prisma.service';
import { FindAccountByEmailRepository } from './interfaces/FindAccountByEmailRepository';
import { productPrismaRepository } from './repositories/prisma/product-prisma.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: CreateAccountRepository,
      useClass: AccountPrismaRepository,
    },
    {
      provide: FindAccountByEmailRepository,
      useClass: AccountPrismaRepository,
    },
    productPrismaRepository,
  ],
  exports: [
    CreateAccountRepository,
    FindAccountByEmailRepository,
    productPrismaRepository,
  ],
})
export class DatabaseModule {}
