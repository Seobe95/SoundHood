import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthModule } from '../auth/auth.module';
import { Like } from '../like/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Like]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
