import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/domain/services/password.service';

@Injectable()
export class BcryptPasswordService implements PasswordService {
  saltRounds: string;
  constructor() {
    this.saltRounds = '10';
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, +this.saltRounds);
  }

  async compare(plain: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashedPassword);
  }
}
