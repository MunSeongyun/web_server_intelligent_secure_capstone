import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UsersModule } from 'src/users/users.module';
import { PasswordService } from './domain/services/password.service';
import { BcryptPasswordService } from 'src/users/infra/service/bcrypt-password.service';
import { TypeormAuthRepository } from './infra/repositories/user-credential.repository';
import { AuthRepository } from './domain/repositories/user-credential.repository';
import { SessionSerializer } from './application/session/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }), // 세션 활성화
  ],
  controllers: [AuthController],
  providers: [
    SessionSerializer,
    CreateUserUseCase,
    LoginUseCase,
    LocalStrategy,
    LocalAuthGuard,
    {
      useClass: BcryptPasswordService,
      provide: PasswordService,
    },
    {
      useClass: TypeormAuthRepository,
      provide: AuthRepository,
    },
  ],
})
export class AuthModule {}
