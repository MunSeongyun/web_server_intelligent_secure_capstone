import { Auth } from '../entities/auth.entity';

export abstract class AuthRepository {
  abstract save(queryRunner, credential: Auth): Promise<boolean>;
  abstract findByUserId(userId: number): Promise<Auth | null>;
  abstract findByEmail(email: string): Promise<Auth | null>;
  abstract updateLoginAttemptCount(
    userId: number,
    loginAttemptCount: number,
  ): Promise<Auth>;
}
