import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/auth/application/use-cases/login.use-case';
import { CreateUserUseCase } from 'src/auth/application/use-cases/create-user.use-case';
import { LoginInput } from 'src/auth/application/dto/login-input.dto';
import { RegisterInput } from 'src/auth/application/dto/register-input.dto';

@Controller('auth')
export class AuthController {
  frontUrl: string = 'https://localhost.com';
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}
  @Post('login')
  async login(@Body() body: LoginInput) {
    const { userId } = await this.loginUseCase.execute(body);
    console.log(userId);
  }
  // 일반 회원가입
  @Post('register')
  async register(@Body() body: RegisterInput) {
    await this.createUserUseCase.execute(body);
    return { message: '회원가입되었습니다.' };
  }
}
