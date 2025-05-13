import { AuthRepository } from 'src/auth/domain/repositories/user-credential.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { AuthOrmEntity } from '../entities/auth.entity';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { toOrmEntity, toDomain } from '../mapper/auth.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormAuthRepository extends AuthRepository {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async findByEmail(email: string): Promise<Auth | null> {
    const user = await this.dataSource
      .getRepository(AuthOrmEntity)
      .createQueryBuilder('auth')
      .where('auth.email = :email', { email })
      .getOne();
    if (!user) return null;
    return toDomain(user);
  }
  async updateLoginAttemptCount(
    userId: number,
    loginAttemptCount: number,
  ): Promise<Auth> {
    const user = await this.dataSource
      .getRepository(AuthOrmEntity)
      .findOneBy({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    user.loginAttemptCount = loginAttemptCount;
    const updatedUser = await this.dataSource
      .getRepository(AuthOrmEntity)
      .save(user);

    return toDomain(updatedUser);
  }

  async save(queryRunner: QueryRunner, credential: Auth): Promise<boolean> {
    const auth = await queryRunner.manager.save(
      AuthOrmEntity,
      toOrmEntity(credential),
    );
    return !!auth;
  }

  async findByUserId(userId: number): Promise<Auth | null> {
    const user = await this.dataSource
      .getRepository(AuthOrmEntity)
      .createQueryBuilder('auth')
      .where('auth.userId = :userId', { userId })
      .getOne();
    if (!user) return null;
    return toDomain(user);
  }
}
