import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../auth/user.entity';
import { Like } from '../like/like.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllMarkers() {
    try {
      const markers = await this.postRepository
        .createQueryBuilder('post')
        .select([
          'post.id',
          'post.latitude',
          'post.longitude',
          'post.albumCover',
          'post.title',
          'post.artist',
        ])
        .getMany();

      return markers;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        '마커를 가져오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async getAllMyMarkers(user: User) {
    try {
      const markers = await this.postRepository
        .createQueryBuilder('post')
        .where('post.userId = :userId', { userId: user.id })
        .select(['post.id', 'post.latitude', 'post.longitude'])
        .getMany();

      return markers;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        '마커를 가져오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async getPosts(page: number) {
    const perPage = 10;
    const offset = (page - 1) * perPage;

    return this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.date', 'DESC')
      .take(perPage)
      .skip(offset)
      .getMany();
  }

  async getPostById(id: string, userId: string) {
    try {
      const foundPost = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .where('post.id = :id', { id })
        .getOne();

      if (!foundPost) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      const { user, ...post } = foundPost;
      const existingLike = await this.likeRepository.findOne({
        where: { user: { id: userId }, post: { id: id } },
      });
      const hasLiked = !!existingLike;
      const isMyPost = user.id === userId;

      return {
        ...post,
        hasLiked,
        isMyPost,
        author: {
          id: user.id,
          nickname: user.nickname,
          profileUri:
            user.loginType === 'kakao' ? user.kakaoImageUri : user.imageUri,
        },
      };
    } catch {
      throw new InternalServerErrorException(
        '장소를 가져오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    const {
      albumCover,
      date,
      description,
      latitude,
      longitude,
      title,
      artist,
      spotifyURL,
    } = createPostDto;

    const post = this.postRepository.create({
      albumCover,
      date,
      description,
      latitude,
      longitude,
      title,
      user,
      artist,
      spotifyURL,
    });

    try {
      await this.postRepository.save(post);
      return { ...post };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하던 도중 에러가 발생했습니다.',
      );
    }
  }

  async deletePost(id: string) {
    try {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .delete()
        .from(Post)
        .where('post.id = :id', { id })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }

      return id;
    } catch (e) {
      console.log(e);
      throw new NotFoundException('삭제도중 에러가 발생했습니다.');
    }
  }

  async updatePost(
    id: string,
    updatePostDto: Pick<CreatePostDto, 'description'>,
  ) {
    const post = await this.getPostById(id, null);
    const { description } = updatePostDto;
    post.description = description;

    try {
      await this.postRepository.save(post);
      return post;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        '장소를 수정하던 도중 에러가 발생했습니다.',
      );
    }
  }
}
