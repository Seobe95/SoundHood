import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../@common/transformer/numeric.transformer';
import { User } from '../auth/user.entity';
import { Like } from '../like/like.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  latitude: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  longitude: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column()
  albumCover: string;

  @Column()
  artist: string;

  @Column()
  spotifyURL: string;

  @Column({
    type: 'int',
    default: 0,
  })
  likeCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.post, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
