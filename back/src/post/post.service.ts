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

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getAllMarkers() {
    try {
      const markers = await this.postRepository
        .createQueryBuilder('post')
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

  async getPostById(id: string) {
    try {
      const foundPost = await this.postRepository
        .createQueryBuilder('post')
        .where('post.id = :id', { id })
        .getOne();
      if (!foundPost) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      return foundPost;
    } catch {
      throw new InternalServerErrorException(
        '장소를 가져오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto) {
    const { albumCover, date, description, latitude, longitude, title } =
      createPostDto;

    const post = this.postRepository.create({
      albumCover,
      date,
      description,
      latitude,
      longitude,
      title,
    });

    try {
      await this.postRepository.save(post);
      return post;
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
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude'>,
  ) {
    const post = await this.getPostById(id);
    const { title, description, date, albumCover } = updatePostDto;
    post.title = title;
    post.description = description;
    post.date = date;
    post.albumCover = albumCover;

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
