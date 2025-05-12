export abstract class PasswordService {
  abstract hash(password: string): Promise<string>;
  abstract compare(plane: string, hashedPassword: string): Promise<boolean>;
}
