import { hash, compare } from 'bcryptjs';
import { Crypter } from '../protocols/crypter';
import { HashComparer } from '../protocols/hash-comparer';

export class BcryptAdapter implements Crypter, HashComparer {
  async encrypt(data: string): Promise<string> {
    const digest = await hash(data, 12);

    return digest;
  }

  async comparer(hashed: string, data: string): Promise<boolean> {
    const isEqual = await compare(data, hashed);

    return isEqual;
  }
}
