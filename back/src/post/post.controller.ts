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
  @UseGuards(AuthGuard())
  getAllMarkers() {
    return this.postService.getAllMarkers();
  }

  @Get('/markers/:userId')
  @UseGuards(AuthGuard())
  getAllMyMarkers(@GetUser() user: User) {
    return this.postService.getAllMyMarkers(user);
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
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
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
}
