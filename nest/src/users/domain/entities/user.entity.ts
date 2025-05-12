export class User {
  constructor(
    public dateOfBirth: string,
    public address: string,
    public readonly ssn: string,
    public phone: string,
    public name: string,
    public email: string,
    public readonly id?: number,
  ) {}
  static create(
    dateOfBirth: string,
    address: string,
    ssn: string,
    phone: string,
    name: string,
    email: string,
  ): User {
    return new User(dateOfBirth, address, ssn, phone, name, email);
  }
}
