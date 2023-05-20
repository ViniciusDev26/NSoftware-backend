export abstract class HashComparer {
  comparer: (hashed: string, data: string) => Promise<boolean>;
}
