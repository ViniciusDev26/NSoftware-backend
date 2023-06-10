import { Account } from 'src/shared/entities/Account';

export abstract class PatchAccountRepository {
  pathUser: (account: Account) => Promise<any>;
}
