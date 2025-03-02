import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../@common/decorators/get-user.decorator';
import { GetPostIdDto } from './dto/get-post-id.dto';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/markers')
  getAllMarkers() {
    return this.postService.getAllMarkers();
  }

  @Get('/posts')
  getPosts(@Query('page') page: number) {
    return this.postService.getPosts(page);
  }

  @Get('/posts/:id')
  @UseGuards(AuthGuard())
  getPostById(
    @GetUser() user: User,
    @Param(ValidationPipe) params: GetPostIdDto,
  ) {
    const { id } = params;
    return this.postService.getPostById(id, user.id);
  }

  @Post('/posts')
  @UseGuards(AuthGuard())
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user.id);
  }

  @Delete('/posts/:id')
  @UseGuards(AuthGuard())
  deletePost(@Param(ValidationPipe) params: GetPostIdDto) {
    const { id } = params;
    return this.postService.deletePost(id);
  }

  @Patch('/posts/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updatePost(
    @Param() params: GetPostIdDto,
    @Body() updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude'>,
  ) {
    const { id } = params;
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get('/my/like')
  @UseGuards(AuthGuard())
  getUserLikePost(@GetUser() user: User) {
    return this.postService.getUserLikePost(user.id);
  }

  @Get('/my/posts')
  @UseGuards(AuthGuard())
  getAllMyMarkers(@GetUser() user: User) {
    return this.postService.getMyPosts(user);
  }
}
