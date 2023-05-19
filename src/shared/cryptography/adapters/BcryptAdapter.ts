import { hash } from 'bcryptjs';
import { Crypter } from '../protocols/crypter';

export class BcryptAdapter implements Crypter {
  async encrypt(data: string): Promise<string> {
    const digest = await hash(data, 12);

    return digest;
  }
}
