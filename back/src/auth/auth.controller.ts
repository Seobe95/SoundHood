import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { EditProfileDto } from './dto/edit-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @Post('/oauth/kakao')
  kakaoSignIn(@Body() kakaoToken: { token: string }) {
    return this.authService.kakaoSignIn(kakaoToken);
  }

  @Post('/oauth/apple')
  appleSignIn(
    @Body()
    appleIdentity: {
      identityToken: string;
      appId: string;
      authorizationCode: string;
    },
  ) {
    return this.authService.appleSignIn(appleIdentity);
  }

  @Get('/refresh')
  @UseGuards(AuthGuard())
  refresh(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }

  @Patch('/me')
  @UseGuards(AuthGuard())
  editProfile(@Body() editProfileDto: EditProfileDto, @GetUser() user: User) {
    return this.authService.editProfile(editProfileDto, user);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User) {
    return this.authService.getProfile(user);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@GetUser() user: User) {
    return this.authService.deleteRefreshToken(user);
  }

  @Delete('/me')
  @UseGuards(AuthGuard())
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccount(user);
  }
}
