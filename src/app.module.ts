import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AccountModule, DatabaseModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
