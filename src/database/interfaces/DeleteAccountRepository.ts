import { Account } from 'src/shared/entities/Account';

export abstract class DeleteAccountByIdRepository {
  findById: (email: string) => Promise<Account | null>;
}
