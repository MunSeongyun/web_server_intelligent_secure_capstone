export class Auth {
  constructor(
    public readonly userId: number,
    public hashedPassword?: string,
    public loginAttemptCount?: number,
  ) {}
  updatePassword(newHash: string) {
    this.hashedPassword = newHash;
  }
  updateLoginAttemptCount() {
    this.loginAttemptCount = (this.loginAttemptCount || 0) + 1;
  }
}
