import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthOrmEntity } from '../entities/auth.entity';

export const toOrmEntity = (authData: Auth): AuthOrmEntity => {
  const orm = new AuthOrmEntity();
  orm.userId = authData.userId;
  if (authData.hashedPassword) orm.hashedPassword = authData.hashedPassword;
  if (authData.loginAttemptCount)
    orm.loginAttemptCount = authData.loginAttemptCount;
  return orm;
};
export const toDomain = (authData: AuthOrmEntity) => {
  const domain = new Auth(
    authData.userId,
    authData.hashedPassword,
    authData.loginAttemptCount,
  );
  return domain;
};
