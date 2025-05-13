import { User } from 'src/users/domain/entities/user.entity';
import { UserOrmEntity } from '../entities/users.entity';

export const toOrmEntity = (user: User): UserOrmEntity => {
  const orm = new UserOrmEntity();
  orm.email = user.email;
  orm.name = user.name;
  orm.dateOfBirth = user.dateOfBirth;
  orm.address = user.address;
  orm.ssn = user.ssn;
  orm.phone = user.phone;
  if (user.id) orm.id = user.id;
  return orm;
};
export const toDomain = (userOrm: UserOrmEntity): User => {
  const domain = new User(
    userOrm.dateOfBirth,
    userOrm.address,
    userOrm.ssn,
    userOrm.phone,
    userOrm.name,
    userOrm.email,
    userOrm.id,
  );
  return domain;
};
