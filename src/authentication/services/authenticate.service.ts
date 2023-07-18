import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';
import { JwtPayloadModel } from '../models/jwt-payload.model';
import { JwtService } from '@nestjs/jwt';
import { HashComparer } from 'src/shared/cryptography/protocols/hash-comparer';
import { authorizationRepository } from 'src/database/repositories/prisma/authentication-prisma.repository';
import { getClientsRepository } from 'src/database/interfaces/getClientsRepository';

interface AuthenticateServiceParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtService: JwtService,
    private readonly repository: authorizationRepository,
    private readonly getClients: getClientsRepository,
  ) {}

  async execute(params: AuthenticateServiceParams) {
    const account = await this.findAccountByEmailRepository.findByMail(
      params.email,
    );

    if (!account) {
      throw new HttpException('Error - Conta inexistente', HttpStatus.CONFLICT);
    }

    const accountDatas = await this.repository.getStausByCompany(account.email);

    const isCorrectPassword = await this.hashComparer.comparer(
      account.password,
      params.password,
    );

    if (!isCorrectPassword) {
      throw new HttpException(
        'Error - Email ou senha incorretos',
        HttpStatus.CONFLICT,
      );
    }

    const payload: JwtPayloadModel = {
      id: account.id,
      email: account.email,
    };
    const token = this.jwtService.sign(payload);

    if (accountDatas) {
      return {
        accessToken: token,
        accountDatas,
      };
    }

    return { accessToken: token };
  }
}
