export abstract class Crypter {
  encrypt: (data: string) => Promise<string>;
}
