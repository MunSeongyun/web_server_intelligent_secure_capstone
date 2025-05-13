import { UserOrmEntity } from 'src/users/infra/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthOrmEntity {
  @PrimaryColumn()
  userId: number;
  @Column({ nullable: true })
  hashedPassword: string;
  @Column({ nullable: true })
  loginAttemptCount: number;
  @OneToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;
}
