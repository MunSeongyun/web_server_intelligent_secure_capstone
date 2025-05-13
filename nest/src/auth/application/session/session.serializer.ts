/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthRepository } from 'src/auth/domain/repositories/user-credential.repository';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(AuthRepository) private readonly authService: AuthRepository,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.id); // 사용자 ID만 저장
  }

  async deserializeUser(userId: number, done: Function) {
    try {
      const user = await this.authService.findByUserId(userId);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
