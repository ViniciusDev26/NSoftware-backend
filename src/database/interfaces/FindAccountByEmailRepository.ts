import { Account } from 'src/shared/entities/Account';

export abstract class FindAccountByEmailRepository {
  findByMail: (email: string) => Promise<Account | null>;
}
