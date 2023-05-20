import { Global, Module } from '@nestjs/common';
import { BcryptAdapter } from './cryptography/adapters/BcryptAdapter';
import { Crypter } from './cryptography/protocols/crypter';
import { HashComparer } from './cryptography/protocols/hash-comparer';

@Global()
@Module({
  providers: [
    {
      provide: Crypter,
      useClass: BcryptAdapter,
    },
    {
      provide: HashComparer,
      useClass: BcryptAdapter,
    },
  ],
  exports: [Crypter, HashComparer],
})
export class SharedModule {}
