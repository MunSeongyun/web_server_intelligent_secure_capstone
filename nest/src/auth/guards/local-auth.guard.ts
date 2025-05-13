import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await new Promise<void>((resolve, reject) => {
      request.logIn(request.user, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    return can;
  }
}
