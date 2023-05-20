import { Account } from 'src/shared/entities/Account';

export abstract class CreateAccountRepository {
  save: (account: Account) => Promise<void>;
}
