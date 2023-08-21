import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, comment: '帳戶/信箱' })
  email!: string;

  @Column({ type: 'bool', default: false, comment: '信箱驗證' })
  emailVerified!: boolean;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', comment: '建立時間' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', comment: '更新時間' })
  updatedAt!: Date;
}
