import { Module } from '@nestjs/common';
import { StripeController } from './controllers/stripeController';
import { StripeService } from './services/stripeService';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
})
export class stripe {}
