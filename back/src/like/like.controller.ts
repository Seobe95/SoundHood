import {
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../@common/decorators/get-user.decorator';
import { GetPostIdDto } from '../post/dto/get-post-id.dto';

@Controller('posts/:postId/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Patch()
  @UseGuards(AuthGuard())
  toggleLike(
    @Param('postId', ValidationPipe) postId: string,
    @GetUser() user: User,
  ) {
    return this.likeService.toggleLike(user.id, postId);
  }

  @Get('count')
  getLikesCount(@Param(ValidationPipe) params: GetPostIdDto) {
    const { id } = params;
    return this.likeService.getLikesCount(id);
  }
}
