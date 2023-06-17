import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51LfpM2C3mBf0Ch8tNO542A6J6eR0VFbWeCRhvHwa3snBqt2fH9YdzE4F4rf1Fmc3J9DAjt5oZKK4pLSosLBl1EMJ00HOlby1dO',
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async handle(amount) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 2000,
        currency: 'brl',
        description: 'Pagamento de Pedido',
      });
      return paymentIntent.client_secret;
      // Retorne o client_secret para o aplicativo React Native
    } catch (error) {
      console.error('Erro ao criar o PaymentIntent:', error);
    }
  }
}
