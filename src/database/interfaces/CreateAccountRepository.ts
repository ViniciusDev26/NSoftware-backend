export abstract class CreateAccountRepository {
  save: (account: any) => Promise<void>;
}
