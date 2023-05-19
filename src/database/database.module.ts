import { Global, Module } from '@nestjs/common';
import { AccountPrismaRepository } from './repositories/prisma/account-prisma.repository';
import { CreateAccountRepository } from './interfaces/CreateAccountRepository';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: CreateAccountRepository,
      useClass: AccountPrismaRepository,
    },
  ],
  exports: [CreateAccountRepository],
})
export class DatabaseModule {}