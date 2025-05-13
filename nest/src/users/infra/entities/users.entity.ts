import { AuthOrmEntity } from 'src/auth/infra/entities/auth.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  dateOfBirth: string;
  @Column()
  address: string;
  @Column()
  ssn: string;
  @Column()
  phone: string;
  @OneToOne(() => AuthOrmEntity, (auth) => auth.user)
  auth: AuthOrmEntity;
}
