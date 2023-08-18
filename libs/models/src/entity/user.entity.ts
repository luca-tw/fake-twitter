import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { GenderEnum } from '../enum/gender.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { comment: '帳戶/信箱' })
  email!: string;

  @Column({ type: 'varchar', comment: '姓名' })
  name!: string;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.OTHER, comment: '性別' })
  gender!: string;

  @Column({ type: 'varchar', comment: '電話號碼' })
  phone!: string;

  @Column({ type: 'varchar', nullable: true, comment: '大頭貼照' })
  thumbnail!: string | null;

  @Column({ type: 'date', nullable: true, comment: '生日' })
  birthday!: string | null;

  @CreateDateColumn({ type: 'timestamp with time zone', comment: '建立於何時' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', comment: '更新於何時' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', comment: '刪除於何時' })
  deletedAt!: Date | null;
}
