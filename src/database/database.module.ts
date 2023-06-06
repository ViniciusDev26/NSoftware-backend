import { Global, Module } from '@nestjs/common';
import { AccountPrismaRepository } from './repositories/prisma/account-prisma.repository';
import { CreateAccountRepository } from './interfaces/CreateAccountRepository';
import { PrismaService } from './services/prisma.service';
import { FindAccountByEmailRepository } from './interfaces/FindAccountByEmailRepository';
import { productPrismaRepository } from './repositories/prisma/product-prisma.repository';
import { orderPrismaRepository } from './repositories/prisma/order-prisma.repository';
import { addressPrismaRepository } from './repositories/prisma/address.prisma.repository';
import { companysPrismaRepository } from './repositories/prisma/company-prisma.repository';
import { authorizationRepository } from './repositories/prisma/authentication-prisma.repository';
import { employeeRepository } from './repositories/prisma/employee-prisma.repository';
import { roleRepository } from './repositories/prisma/role-prisma.repository';

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
    addressPrismaRepository,
    orderPrismaRepository,
    companysPrismaRepository,
    authorizationRepository,
    employeeRepository,
    roleRepository,
  ],
  exports: [
    CreateAccountRepository,
    FindAccountByEmailRepository,
    productPrismaRepository,
    orderPrismaRepository,
    addressPrismaRepository,
    companysPrismaRepository,
    authorizationRepository,
    employeeRepository,
    roleRepository,
  ],
})
export class DatabaseModule {}
