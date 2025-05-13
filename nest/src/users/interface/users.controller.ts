import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GetUserInfo } from 'src/users/application/use-cases/get-user-info.use-case';
import { AuthGuard } from 'src/common/guards/auth.guard';
export interface CustomRequest extends Request {
  user: {
    userId: number;
  };
}

@Controller('user')
export class UsersController {
  constructor(private readonly getUserInfo: GetUserInfo) {}

  // 유저의 정보 반환
  @UseGuards(AuthGuard)
  @Get()
  async findUserInfo(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    const userInfo = await this.getUserInfo.execute(userId);
    return {
      message: '유저 정보를 반환합니다.',
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        dateOfBirth: userInfo.dateOfBirth,
        address: userInfo.address,
      },
    };
  }
}
