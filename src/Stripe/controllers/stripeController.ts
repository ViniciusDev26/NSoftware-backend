import { Controller, Get, Query } from '@nestjs/common';
import { StripeService } from '../services/stripeService';

@Controller('/Stripe')
export class StripeController {
  constructor(readonly service: StripeService) {}
  @Get('/')
  async clientSecret(@Query() amount) {
    const returnSecretKey = await this.service.handle(amount);
    return returnSecretKey;
  }
}
