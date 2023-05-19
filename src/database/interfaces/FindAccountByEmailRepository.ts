import { Account } from 'src/account/entities/Account';

export abstract class FindAccountByEmailRepository {
  findByMail: (email: string) => Promise<Account | null>;
}
