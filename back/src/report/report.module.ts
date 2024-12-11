import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/post.entity';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Report } from './report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Post, User]), AuthModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
