import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(queryRunner, user: User): Promise<User>;
  abstract updateName(queryRunner, id: number, name: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(userId: number): Promise<User | null>;
}
