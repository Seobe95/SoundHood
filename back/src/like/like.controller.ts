import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../@common/decorators/get-user.decorator';

@Controller('posts/:postId/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Patch()
  @UseGuards(AuthGuard())
  toggleLike(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
  ) {
    return this.likeService.toggleLike(user.id, postId);
  }

  @Get('count')
  getLikesCount(@Param('postId', ParseIntPipe) postId: number) {
    return this.likeService.getLikesCount(postId);
  }
}
