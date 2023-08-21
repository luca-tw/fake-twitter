import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { GenderEnum } from '../enum/gender.enum';
import { UserEntity } from './user.entity';

@Entity('user_profiles')
export class UserProfileEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  user!: UserEntity;

  @Column({ type: 'varchar', unique: true, comment: '姓名' })
  username!: string;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.OTHER, comment: '性別' })
  gender!: GenderEnum;

  @Column({ type: 'varchar', comment: '電話號碼' })
  phone!: string;

  @Column({ type: 'varchar', nullable: true, comment: '大頭貼照' })
  thumbnail!: string | null;

  @Column({ type: 'timestamp with time zone', nullable: true, comment: '生日' })
  birthday!: Date | null;

  @CreateDateColumn({ type: 'timestamp with time zone', comment: '建立時間' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', comment: '更新時間' })
  updatedAt!: Date;
}
