import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', comment: '建立者' })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: UserEntity;

  @Column({ type: 'uuid', comment: '文章id' })
  postId!: string;

  @ManyToOne(() => PostEntity)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post!: PostEntity;

  @Column({ type: 'varchar', comment: '內容' })
  content!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', comment: '建立時間' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', comment: '更新時間' })
  updatedAt!: Date;
}
