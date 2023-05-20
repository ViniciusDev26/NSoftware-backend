import { Injectable } from '@nestjs/common';
import { FindAccountByEmailRepository } from 'src/database/interfaces/FindAccountByEmailRepository';
import { JwtPayloadModel } from '../models/jwt-payload.model';
import { JwtService } from '@nestjs/jwt';
import { HashComparer } from 'src/shared/cryptography/protocols/hash-comparer';

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
  ) {}

  async execute(params: AuthenticateServiceParams) {
    const account = await this.findAccountByEmailRepository.findByMail(
      params.email,
    );
    if (!account) return null;

    const isCorrectPassword = this.hashComparer.comparer(
      account.password,
      params.password,
    );

    if (!isCorrectPassword) return null;

    const payload: JwtPayloadModel = {
      id: account.id,
      email: account.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}
