import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Like } from '../like/like.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  loginType: 'email' | 'kakao' | 'apple';

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: '' })
  nickname?: string;

  @Column({ nullable: true, default: '' })
  imageUri?: string;

  @Column({ nullable: true, default: '' })
  kakaoImageUri?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @OneToMany(() => Post, (post) => post.user, { eager: false })
  post: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
