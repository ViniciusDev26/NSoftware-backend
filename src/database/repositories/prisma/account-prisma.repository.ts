import { Account } from 'src/shared/entities/Account';
import { CreateAccountRepository } from '../../interfaces/CreateAccountRepository';
import { PrismaService } from 'src/database/services/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';
import { PatchAccountRepository } from 'src/database/interfaces/patchAccountRepository';
import { DeleteAccountByIdRepository } from 'src/database/interfaces/DeleteAccountRepository';
import { getClientsRepository } from 'src/database/interfaces/getClientsRepository';

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

  async save(data: any): Promise<void> {
    const emailExiste = await this.prismaService.account.findFirst({
      where: {
        email: data.email,
      },
    });
    if (emailExiste) {
      throw new HttpException('Erro - Email já em uso', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.prismaService.account.create({
        data,
      });
      throw new HttpException('Success - Usuário salvo', HttpStatus.ACCEPTED);
    } catch (error) {
      throw new HttpException(
        'Erro - Por favor, verifique os dados enviados',
        HttpStatus.BAD_REQUEST,
      );
    }
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
        'Error - Não foi possível salvar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async pathUser(account: Account) {
    try {
      const edition = await this.prismaService.account.update({
        where: {
          email: account.email,
        },
        data: {
          roleId: account.roleId,
          wage: account.wage,
          addressId: account.addressId,
        },
      });
      return edition;
    } catch {
      throw new HttpException(
        'Error - Não foi possível alterar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
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
