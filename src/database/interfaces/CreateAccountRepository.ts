import { Account } from 'src/account/entities/Account';

export abstract class CreateAccountRepository {
  save: (account: Account) => Promise<void>;
}
