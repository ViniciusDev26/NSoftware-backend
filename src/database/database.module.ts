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
import { PatchAccountRepository } from './interfaces/patchAccountRepository';
import { DeleteAccountByIdRepository } from './interfaces/DeleteAccountRepository';
import { getClientsRepository } from './interfaces/getClientsRepository';
import { SizeRepository } from './repositories/prisma/size-prisma.repository';
import { FavoritePrismaRepository } from './repositories/prisma/favorite-prisma.repository';
import { CategoryRepository } from './repositories/prisma/category-prisma.repository';
import { ChatRepository } from './repositories/prisma/chat-prisma.repository';

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
    { provide: PatchAccountRepository, useClass: AccountPrismaRepository },
    { provide: DeleteAccountByIdRepository, useClass: AccountPrismaRepository },
    { provide: getClientsRepository, useClass: AccountPrismaRepository },

    SizeRepository,
    productPrismaRepository,
    addressPrismaRepository,
    orderPrismaRepository,
    companysPrismaRepository,
    authorizationRepository,
    employeeRepository,
    roleRepository,
    FavoritePrismaRepository,
    CategoryRepository,
    ChatRepository,
  ],
  exports: [
    DeleteAccountByIdRepository,
    CreateAccountRepository,
    PatchAccountRepository,
    FindAccountByEmailRepository,
    productPrismaRepository,
    getClientsRepository,
    orderPrismaRepository,
    SizeRepository,
    addressPrismaRepository,
    companysPrismaRepository,
    authorizationRepository,
    employeeRepository,
    roleRepository,
    FavoritePrismaRepository,
    CategoryRepository,
    ChatRepository,
  ],
})
export class DatabaseModule {}
