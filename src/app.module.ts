import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { productModule } from './product/product.module';

@Module({
  imports: [
    AccountModule,
    AuthenticationModule,
    DatabaseModule,
    SharedModule,
    productModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
