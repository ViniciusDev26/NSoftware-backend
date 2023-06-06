import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { productModule } from './product/product.module';
import { orderModule } from './order/order.module';
import { addressModule } from './address/address.module';
import { companyModule } from './companys/companys.module';
import { employeeModule } from './employee/employee-module';
import { roleModule } from './role/role.module';

@Module({
  imports: [
    AccountModule,
    AuthenticationModule,
    DatabaseModule,
    SharedModule,
    productModule,
    orderModule,
    addressModule,
    companyModule,
    employeeModule,
    roleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
