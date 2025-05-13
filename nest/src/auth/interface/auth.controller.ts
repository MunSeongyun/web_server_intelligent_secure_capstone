import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CreateUserUseCase } from 'src/auth/application/use-cases/create-user.use-case';
import { RegisterInput } from 'src/auth/application/dto/register-input.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

@Controller('auth')
export class AuthController {
  frontUrl: string = 'https://localhost.com';
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @UseGuards(LocalAuthGuard) // LocalAuthGuard를 사용하여 로그인 요청 보호
  @Post('login')
  async login(@Req() req: AuthenticatedRequest) {
    // Passport가 인증 성공 시 req.user에 사용자 정보를 저장
    return { message: '로그인 성공', user: req.user };
  }

  // 일반 회원가입
  @Post('register')
  async register(@Body() body: RegisterInput) {
    await this.createUserUseCase.execute(body);
    return { message: '회원가입되었습니다.' };
  }
}
