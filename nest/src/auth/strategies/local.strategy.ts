import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUseCase } from '../application/use-cases/login.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginUseCase: LoginUseCase) {
    super({ usernameField: 'email', passwordField: 'password' }); // 요청 필드 이름 설정
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const { userId } = await this.loginUseCase.execute({ email, password });
      return { id: userId, email }; // req.user에 저장될 데이터
    } catch {
      throw new UnauthorizedException('아이디나 비밀번호가 틀렸습니다.');
    }
  }
}
