import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account-controller';
import { CreateAccountService } from './services/create-account.service';
import { SharedModule } from 'src/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [CreateAccountService],
  controllers: [AccountController],
})
export class AccountModule {}
