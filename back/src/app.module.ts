import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from './like/like.module';
import { ReportModule } from './report/report.module';
import { ImageController } from './image/image.controller';
import { ImageModule } from './image/image.module';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  entities: [__dirname + '/**/*.entity.{js, ts}'],
  synchronize: false,
  // 개발용에서만 true로 설정하기
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ...typeOrmModuleOptions,
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
