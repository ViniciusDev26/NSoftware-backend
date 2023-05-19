import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountService } from '../services/create-account.service';

@Controller('/account')
export class AccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Post('/')
  async createAccount(@Body() params) {
    await this.createAccountService.execute(params);
  }
}
