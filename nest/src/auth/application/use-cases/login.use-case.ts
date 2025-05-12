import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/auth/domain/repositories/user-credential.repository';
import { PasswordService } from 'src/auth/domain/services/password.service';
import { UserRepository } from 'src/users/domain/repositories/users.repository';
import { LoginInput } from '../dto/login-input.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(input: LoginInput): Promise<{ userId: number }> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user?.id)
      throw new BadRequestException('아이디나 비밀번호가 틀렸습니다.');
    const credential = await this.authRepository.findByUserId(user.id);
    // Check if the user is locked out
    if (credential.loginAttemptCount >= 5) {
      throw new BadRequestException(
        '계정이 잠겼습니다. 관리자에게 문의하세요.',
      );
    }
    if (!credential)
      throw new BadRequestException('아이디나 비밀번호가 틀렸습니다.');

    const isValid = await this.passwordService.compare(
      input.password,
      credential.hashedPassword,
    );
    if (!isValid) {
      await this.authRepository.updateLoginAttemptCount(
        user.id,
        (credential.loginAttemptCount || 0) + 1,
      );
      throw new BadRequestException('아이디나 비밀번호가 틀렸습니다.');
    }
    return {
      userId: user.id,
    };
  }
}
