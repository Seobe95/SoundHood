import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from '../post/post.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createReport(user: User, createReportDto: CreateReportDto) {
    const reporter = await this.userRepository.findOneBy({ id: user.id });
    if (!reporter) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    const { targetPostId, reason } = createReportDto;

    const reportedPost = await this.postRepository.findOneBy({
      id: targetPostId,
    });

    if (!reportedPost) {
      throw new NotFoundException('신고할 게시글을 찾을 수 없습니다.');
    }

    const report = this.reportRepository.create({
      reason,
      targetPostId,
      reporterId: reporter.id,
    });

    try {
      await this.reportRepository.save(report);
      return { isReported: true };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        '게시글을 신고하던 도중 에러가 발생했습니다.',
      );
    }
  }
}
