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
import { moduleSize } from './size/size.module';
import { stripe } from './Stripe/stripe.module';
import { favoriteModule } from './Favorite/favorite.module';
import { CategoryModule } from './Category/category.module';
import { AmazonModule } from './AmazonS3/amazon.module';
import { ChatModule } from './Chat/chat.module';
import { SocketGateway } from './socket.gateway'; // Importe o SocketGateway
import { ChatController } from './Chat/Cotrollers/Chat.Controller';

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
    moduleSize,
    stripe,
    favoriteModule,
    CategoryModule,
    AmazonModule,
    ChatModule,
  ],
  controllers: [ChatController],
  providers: [SocketGateway],
})
export class AppModule {}
