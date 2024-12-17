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

const isProduction = process.env.NODE_ENV === 'production';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: isProduction ? process.env.DB_HOST : 'localhost',
  port: 5432,
  username: isProduction ? process.env.DB_USERNAME : 'seobe',
  password: isProduction ? process.env.DB_PASSWORD : 'postgres',
  database: isProduction ? process.env.DB_DATABASE : 'soundhood-server',
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
