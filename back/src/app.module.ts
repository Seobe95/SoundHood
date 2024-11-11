import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'seobe',
      password: 'postgres',
      database: 'soundhood-server',
      entities: [__dirname + '/**/*.entity.{js, ts}'],
      synchronize: true,
      // 개발용에서만 true로 설정하기
    }),
    PostModule,
    AuthModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
