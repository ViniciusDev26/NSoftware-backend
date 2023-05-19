import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account-controller';
import { CreateAccountService } from './services/create-account.service';

@Module({
  imports: [],
  providers: [CreateAccountService],
  controllers: [AccountController],
})
export class AccountModule {}
