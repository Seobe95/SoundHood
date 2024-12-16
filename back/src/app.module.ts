import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from './like/like.module';
import { ReportModule } from './report/report.module';
import { ImageController } from './image/image.controller';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js, ts}'],
      synchronize: true,
      // 개발용에서만 true로 설정하기
    }),
    PostModule,
    AuthModule,
    LikeModule,
    ReportModule,
    ImageModule,
  ],
  controllers: [AppController, ImageController],
  providers: [AppService],
})
export class AppModule {}
