import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStratege } from './jwt.strategy';
import { Post } from 'src/post/post.entity';
import { Like } from 'src/like/like.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, Post, Like]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratege],
  exports: [JwtStratege, PassportModule],
})
export class AuthModule {}
