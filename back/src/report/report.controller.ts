import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../@common/decorators/get-user.decorator';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../auth/user.entity';

@Controller()
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('/report')
  @UseGuards(AuthGuard())
  createReport(
    @GetUser() user: User,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportService.createReport(user, createReportDto);
  }
}
