import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Posts')
export class PostEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', comment: '建立者' })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: UserEntity;

  @Column({ type: 'varchar', comment: '標題' })
  title!: string;

  @Column({ type: 'varchar', comment: '內容' })
  content!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', comment: '建立時間' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', comment: '更新時間' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, comment: '刪除時間' })
  deletedAt!: Date | null;
}
