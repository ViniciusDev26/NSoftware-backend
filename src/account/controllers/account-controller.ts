import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountService } from '../services/create-account.service';
import { CreateAccountDTO } from '../dtos/create-account.dto';

@Controller('/account')
export class AccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Post('/')
  async createAccount(@Body() params: CreateAccountDTO) {
    await this.createAccountService.execute(params);
  }
}
