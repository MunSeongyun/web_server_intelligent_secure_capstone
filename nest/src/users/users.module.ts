import { Module } from '@nestjs/common';
import { UsersController } from './interface/users.controller';
import { UserRepository } from './domain/repositories/users.repository';
import { TypeormUserRepository } from './infra/repositories/typeorm-user.repository';
import { GetUserInfo } from './application/use-cases/get-user-info.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    GetUserInfo,
    {
      useClass: TypeormUserRepository,
      provide: UserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
