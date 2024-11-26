import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async toggleLike(userId: string, postId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .getOne();
    if (!post) throw new NotFoundException('Post not found');
    try {
      const existingLike = await this.likeRepository.findOne({
        where: {
          user: { id: userId },
          post: { id: postId },
        },
      });

      if (existingLike) {
        await this.likeRepository.remove(existingLike);
        post.likeCount -= 1;
      } else {
        const like = this.likeRepository.create({
          user: { id: userId },
          post: { id: postId },
        });
        post.likeCount += 1;
        await this.likeRepository.save(like);
      }

      await this.postRepository.save(post);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('좋아요 에러');
    }
  }

  async getLikesCount(postId: string) {
    return await this.likeRepository.count({ where: { post: { id: postId } } });
  }
}
