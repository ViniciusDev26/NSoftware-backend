import { Module } from '@nestjs/common';
import { BcryptAdapter } from './cryptography/adapters/BcryptAdapter';
import { Crypter } from './cryptography/protocols/crypter';

@Module({
  providers: [
    {
      provide: Crypter,
      useClass: BcryptAdapter,
    },
  ],
  exports: [Crypter],
})
export class SharedModule {}
